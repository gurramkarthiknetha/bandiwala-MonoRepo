import 'package:bandiwala/services/api_service.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final authServiceProvider = StateNotifierProvider<AuthService, AsyncValue<User?>>((ref) {
  return AuthService();
});

class AuthService extends StateNotifier<AsyncValue<User?>> {
  AuthService() : super(const AsyncValue.loading()) {
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    state = await AsyncValue.guard(() async {
      final token = await StorageService.getToken();
      if (token == null) return null;
      return ApiService.getCurrentUser();
    });
  }

  Future<void> login(String email, String password) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final user = await ApiService.login(email, password);
      await StorageService.saveToken(user.token);
      return user;
    });
  }
}