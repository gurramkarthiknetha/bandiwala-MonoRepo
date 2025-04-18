import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/services/location_service.dart';

class VendorSignupScreen extends ConsumerStatefulWidget {
  @override
  _VendorSignupScreenState createState() => _VendorSignupScreenState();
}

class _VendorSignupScreenState extends ConsumerState<VendorSignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _phoneController = TextEditingController();
  final _descriptionController = TextEditingController();
  String _selectedCity = 'Mumbai';
  bool _isLoading = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _phoneController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final location = await LocationService.getLocationForCity(_selectedCity);

      final vendorData = {
        'name': _nameController.text,
        'email': _emailController.text,
        'password': _passwordController.text,
        'phoneNumber': _phoneController.text,
        'description': _descriptionController.text,
        'location': {
          'city': _selectedCity,
          'latitude': location.latitude,
          'longitude': location.longitude,
        },
      };

      await ApiService.registerVendor(vendorData);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
              'Registration successful! Please wait for admin verification.',
            ),
          ),
        );
        Navigator.pop(context);
      }
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
    return Scaffold(
      appBar: AppBar(title: const Text('Vendor Registration')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Business Name'),
              validator:
                  (value) =>
                      value?.isEmpty ?? true
                          ? 'Please enter business name'
                          : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Email'),
              keyboardType: TextInputType.emailAddress,
              validator:
                  (value) =>
                      value?.isEmpty ?? true ? 'Please enter email' : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _passwordController,
              decoration: const InputDecoration(labelText: 'Password'),
              obscureText: true,
              validator:
                  (value) =>
                      (value?.length ?? 0) < 6
                          ? 'Password must be at least 6 characters'
                          : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _phoneController,
              decoration: const InputDecoration(labelText: 'Phone Number'),
              keyboardType: TextInputType.phone,
              validator:
                  (value) =>
                      value?.isEmpty ?? true
                          ? 'Please enter phone number'
                          : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _descriptionController,
              decoration: const InputDecoration(
                labelText: 'Business Description',
              ),
              maxLines: 3,
              validator:
                  (value) =>
                      value?.isEmpty ?? true
                          ? 'Please enter business description'
                          : null,
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _selectedCity,
              decoration: const InputDecoration(labelText: 'City'),
              items:
                  ['Mumbai', 'Delhi', 'Bangalore', 'Chennai']
                      .map(
                        (city) =>
                            DropdownMenuItem(value: city, child: Text(city)),
                      )
                      .toList(),
              onChanged: (value) => setState(() => _selectedCity = value!),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _isLoading ? null : _register,
              child:
                  _isLoading
                      ? const CircularProgressIndicator()
                      : const Text('Register'),
            ),
          ],
        ),
      ),
    );
  }
}
