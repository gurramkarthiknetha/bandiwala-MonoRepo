import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/models/user.dart'; // adjust path if needed
import 'package:bandiwala/services/storage_service.dart'; // assumed storage service

final authServiceProvider =
    StateNotifierProvider<AuthService, AsyncValue<User?>>((ref) {
      return AuthService();
    });

class AuthService extends StateNotifier<AsyncValue<User?>> {
  AuthService() : super(const AsyncValue.loading()) {
    _checkAuth();
  }

  /// Checks if user is already authenticated
  Future<void> _checkAuth() async {
    state = await AsyncValue.guard(() async {
      final token = await StorageService.getToken();
      if (token == null) return null;
      return ApiService.getCurrentUser(); // assumes this returns a User
    });
  }

  /// Performs login and saves token
  Future<void> login(String email, String password) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final user = await ApiService.login(
        email,
        password,
      ); // assumes this returns a User
      await StorageService.saveToken(user.token);
      return user;
    });
  }

  /// Logs the user out
  Future<void> logout() async {
    await StorageService.clearToken();
    state = const AsyncValue.data(null);
  }
}
