import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/models/product_model.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/services/auth_service.dart';

class CartScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authServiceProvider).value;
    if (user == null) return const Center(child: CircularProgressIndicator());

    return Scaffold(
      appBar: AppBar(title: const Text('Cart')),
      body: ListView.builder(
        itemCount: user.cart.length,
        itemBuilder: (context, index) {
          final cartItem = user.cart[index];
          return FutureBuilder<Product>(
            future: ApiService.getProduct(cartItem.productId),
            builder: (context, snapshot) {
              if (!snapshot.hasData) {
                return const Center(child: CircularProgressIndicator());
              }

              final product = snapshot.data!;
              return Dismissible(
                key: Key(product.id),
                direction: DismissDirection.endToStart,
                background: Container(
                  color: Colors.red,
                  alignment: Alignment.centerRight,
                  padding: const EdgeInsets.only(right: 16),
                  child: const Icon(Icons.delete, color: Colors.white),
                ),
                onDismissed: (_) async {
                  try {
                    await ApiService.removeFromCart(user.id, product.id);
                    ref.refresh(authServiceProvider);
                  } catch (e) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error removing item: $e')),
                    );
                  }
                },
                child: Card(
                  margin: const EdgeInsets.all(8),
                  child: ListTile(
                    leading:
                        product.images.isNotEmpty
                            ? Image.network(
                              product.images.first,
                              width: 56,
                              height: 56,
                              fit: BoxFit.cover,
                            )
                            : const Icon(Icons.image),
                    title: Text(product.name),
                    subtitle: Text(
                      'Price: ₹${product.price} x ${cartItem.quantity}',
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.remove),
                          onPressed: () async {
                            try {
                              if (cartItem.quantity > 1) {
                                await ApiService.updateCartItem(
                                  user.id,
                                  product.id,
                                  cartItem.quantity - 1,
                                );
                                ref.refresh(authServiceProvider);
                              }
                            } catch (e) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Error updating quantity: $e'),
                                ),
                              );
                            }
                          },
                        ),
                        Text('${cartItem.quantity}'),
                        IconButton(
                          icon: const Icon(Icons.add),
                          onPressed: () async {
                            try {
                              await ApiService.updateCartItem(
                                user.id,
                                product.id,
                                cartItem.quantity + 1,
                              );
                              ref.refresh(authServiceProvider);
                            } catch (e) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Error updating quantity: $e'),
                                ),
                              );
                            }
                          },
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.2),
              spreadRadius: 1,
              blurRadius: 5,
            ),
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Total: ₹${_calculateTotal(user.cart)}',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            ElevatedButton(
              onPressed: user.cart.isEmpty ? null : () => _checkout(context),
              child: const Text('Checkout'),
            ),
          ],
        ),
      ),
    );
  }

  double _calculateTotal(List<dynamic> cart) {
    // You would typically calculate this based on the product prices
    // For now, return a placeholder value
    return 0.0;
  }

  void _checkout(BuildContext context) {
    // Implement checkout logic
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Checkout functionality coming soon!')),
    );
  }
}
