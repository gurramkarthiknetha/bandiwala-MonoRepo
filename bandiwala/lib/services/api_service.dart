import 'dart:async';

import 'package:bandiwala/models/product_model.dart';
import 'package:bandiwala/models/user_model.dart';
import 'package:bandiwala/models/vendor_model.dart';
import 'package:dio/dio.dart';

class ApiService {
  static final _dio = Dio(
    BaseOptions(
      baseUrl: 'http://localhost:3000/api',
      connectTimeout: const Duration(seconds: 5),
      receiveTimeout: const Duration(seconds: 3),
    ),
  );

  // Auth Endpoints
  static Future<User> login(String email, String password) async {
    try {
      final response = await _dio.post(
        '/users/login',
        data: {'email': email, 'password': password},
      );
      return User.fromJson(response.data);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<User> getCurrentUser() async {
    try {
      final response = await _dio.get('/users/me');
      return User.fromJson(response.data);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  // Product Endpoints
  static Future<List<Product>> getProducts() async {
    try {
      final response = await _dio.get('/products');
      return (response.data as List).map((e) => Product.fromJson(e)).toList();
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<Product> getProduct(String id) async {
    try {
      final response = await _dio.get('/products/$id');
      return Product.fromJson(response.data);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  // Vendor Endpoints
  static Future<List<Vendor>> getVendors() async {
    try {
      final response = await _dio.get('/vendors');
      return (response.data as List).map((e) => Vendor.fromJson(e)).toList();
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<Vendor> getVendor(String id) async {
    try {
      final response = await _dio.get('/vendors/$id');
      return Vendor.fromJson(response.data);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<List<Product>> getVendorProducts(String vendorId) async {
    try {
      final response = await _dio.get('/products/vendor/$vendorId');
      return (response.data as List).map((e) => Product.fromJson(e)).toList();
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  // Admin Endpoints
  static Future<void> verifyVendor(String vendorId) async {
    try {
      await _dio.patch('/admin/verify-vendor/$vendorId');
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<List<User>> getAllUsers() async {
    try {
      final response = await _dio.get('/admin/users');
      return (response.data as List).map((e) => User.fromJson(e)).toList();
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  // Cart Endpoints
  static Future<User> addToCart(
    String userId,
    String productId,
    int quantity,
  ) async {
    try {
      final response = await _dio.post(
        '/users/$userId/cart',
        data: {'productId': productId, 'quantity': quantity},
      );
      return User.fromJson(response.data);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<User> updateCartItem(
    String userId,
    String productId,
    int quantity,
  ) async {
    try {
      final response = await _dio.patch(
        '/users/$userId/cart/$productId',
        data: {'quantity': quantity},
      );
      return User.fromJson(response.data);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<User> removeFromCart(String userId, String productId) async {
    try {
      final response = await _dio.delete('/users/$userId/cart/$productId');
      return User.fromJson(response.data);
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  // Error Handler
  static void _handleError(DioException e) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        throw TimeoutException('Connection timed out');
      case DioExceptionType.connectionError:
        throw Exception('No internet connection');
      default:
        throw Exception(e.response?.data['message'] ?? 'Something went wrong');
    }
  }

  static Future<dynamic> registerVendor(Map<String, dynamic> vendorData) async {
    try {
      final response = await _dio.post('/vendors', data: vendorData);
      return response.data;
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<dynamic> register(
    Map<String, dynamic> userData,
    String role,
  ) async {
    try {
      final endpoint = role == 'vendor' ? '/vendors' : '/users';
      final response = await _dio.post(endpoint, data: userData);
      return response.data;
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<dynamic> createProduct(Map<String, dynamic> productData) async {
    try {
      final response = await _dio.post('/products', data: productData);
      return response.data;
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }

  static Future<dynamic> updateProduct(
    String id,
    Map<String, dynamic> productData,
  ) async {
    try {
      final response = await _dio.put('/products/$id', data: productData);
      return response.data;
    } on DioException catch (e) {
      _handleError(e);
      rethrow;
    }
  }
}
