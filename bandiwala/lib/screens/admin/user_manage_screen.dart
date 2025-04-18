import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/models/user_model.dart';
import 'package:bandiwala/services/api_service.dart';

final usersProvider = FutureProvider((ref) => ApiService.getAllUsers());

class UserManageScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final usersAsync = ref.watch(usersProvider);

    return usersAsync.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (err, stack) => Center(child: Text('Error: $err')),
      data:
          (users) => ListView.builder(
            itemCount: users.length,
            itemBuilder: (context, index) {
              final user = users[index];
              return Card(
                margin: const EdgeInsets.all(8.0),
                child: ListTile(
                  title: Text(user.username),
                  subtitle: Text(user.email),
                  trailing: IconButton(
                    icon: const Icon(Icons.info_outline),
                    onPressed: () => _showUserDetails(context, user),
                  ),
                ),
              );
            },
          ),
    );
  }

  void _showUserDetails(BuildContext context, User user) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: Text(user.username),
            content: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Email: ${user.email}'),
                  const SizedBox(height: 8),
                  Text('Phone: ${user.phoneNumber}'),
                  const SizedBox(height: 8),
                  Text('Address: ${user.address}'),
                  const SizedBox(height: 8),
                  Text('Items in Cart: ${user.cart.length}'),
                ],
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Close'),
              ),
            ],
          ),
    );
  }
}
