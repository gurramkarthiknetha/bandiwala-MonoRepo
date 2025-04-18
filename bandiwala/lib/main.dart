import 'package:bandiwala/screens/auth/welcome_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/screens/auth/login_screen.dart';
import 'package:bandiwala/screens/admin/dashboard_screen.dart';
import 'package:bandiwala/screens/vendor/dashboard_screen.dart';
import 'package:bandiwala/screens/user/home_screen.dart';
import 'package:bandiwala/services/auth_service.dart';
import 'package:bandiwala/services/storage_service.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authServiceProvider);

    return MaterialApp(
      title: 'Bandiwale',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
        appBarTheme: const AppBarTheme(centerTitle: true, elevation: 0),
      ),
      home: authState.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => LoginScreen(error: err.toString()),
        data: (user) {
          if (user == null) {
            // return const LoginScreen();
            // return AdminDashboard();
            return const BandiwalaWelcomeScreen();
          }
          return FutureBuilder<String?>(
            future: StorageService.getUserType(),
            builder: (context, snapshot) {
              if (!snapshot.hasData) {
                return const Center(child: CircularProgressIndicator());
              }

              switch (snapshot.data) {
                case 'admin':
                  return AdminDashboard();
                case 'vendor':
                  return VendorDashboard(vendorId: user.id);
                case 'user':
                default:
                  return HomeScreen();
              }
            },
          );
        },
      ),
    );
  }
}
