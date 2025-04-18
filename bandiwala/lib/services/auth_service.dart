import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/models/user_model.dart';
import 'package:bandiwala/models/vendor_model.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/services/storage_service.dart';

final authServiceProvider =
    StateNotifierProvider<AuthService, AsyncValue<dynamic>>(
      (ref) => AuthService(),
    );

class AuthService extends StateNotifier<AsyncValue<dynamic>> {
  AuthService() : super(const AsyncValue.loading()) {
    _init();
  }

  Future<void> _init() async {
    final token = await StorageService.getToken();
    final userType = await StorageService.getUserType();
    if (token != null && userType != null) {
      try {
        final userData = await ApiService.getCurrentUser();
        state = AsyncValue.data(userData);
      } catch (e) {
        state = AsyncValue.error(e, StackTrace.current);
        await StorageService.clearAuth();
      }
    } else {
      state = const AsyncValue.data(null);
    }
  }

  Future<void> login(String email, String password, String role) async {
    try {
      state = const AsyncValue.loading();
      final response = await ApiService.login(email, password);
      await StorageService.saveToken(response.token!);
      await StorageService.saveUserType(role);
      state = AsyncValue.data(response);
    } catch (e) {
      state = AsyncValue.error(e, StackTrace.current);
      rethrow;
    }
  }

  Future<void> logout() async {
    await StorageService.clearAuth();
    state = const AsyncValue.data(null);
  }

  Future<void> register(Map<String, dynamic> userData, String role) async {
    try {
      state = const AsyncValue.loading();
      final response = await ApiService.register(userData, role);
      await StorageService.saveToken(response.token!);
      await StorageService.saveUserType(role);
      state = AsyncValue.data(response);
    } catch (e) {
      state = AsyncValue.error(e, StackTrace.current);
      rethrow;
    }
  }
}
