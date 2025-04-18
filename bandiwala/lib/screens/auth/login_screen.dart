import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/screens/auth/vendor_signup_screen.dart';
import 'package:bandiwala/screens/auth/signup_screen.dart';
import 'package:bandiwala/services/auth_service.dart';

class LoginScreen extends ConsumerStatefulWidget {
  final String? error;
  const LoginScreen({this.error});

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String _selectedRole = 'user';
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final authService = ref.read(authServiceProvider.notifier);
      await authService.login(
        _emailController.text,
        _passwordController.text,
        _selectedRole,
      );
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Error: $e')));
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (widget.error != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text(widget.error!)));
      });
    }

    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'BRNDIWALE',
                  style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 48),
                SegmentedButton<String>(
                  segments: const [
                    ButtonSegment(value: 'user', label: Text('User')),
                    ButtonSegment(value: 'vendor', label: Text('Vendor')),
                  ],
                  selected: {_selectedRole},
                  onSelectionChanged: (Set<String> selected) {
                    setState(() => _selectedRole = selected.first);
                  },
                ),
                const SizedBox(height: 24),
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    labelText: 'Email',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  validator:
                      (value) =>
                          value?.isEmpty ?? true
                              ? 'Please enter your email'
                              : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  decoration: const InputDecoration(
                    labelText: 'Password',
                    border: OutlineInputBorder(),
                  ),
                  obscureText: true,
                  validator:
                      (value) =>
                          value?.isEmpty ?? true
                              ? 'Please enter your password'
                              : null,
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _isLoading ? null : _login,
                  child:
                      _isLoading
                          ? const CircularProgressIndicator()
                          : const Text('Login'),
                ),
                const SizedBox(height: 16),
                TextButton(
                  onPressed:
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder:
                              (context) =>
                                  _selectedRole == 'user'
                                      ? SignupScreen()
                                      : VendorSignupScreen(),
                        ),
                      ),
                  child: Text(
                    _selectedRole == 'user'
                        ? 'Create a user account'
                        : 'Register as a vendor',
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
