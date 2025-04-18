import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/models/product_model.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/screens/vendor/product_manage_screen.dart';
import 'package:bandiwala/widgets/product_card.dart';

final vendorProductsProvider = FutureProvider.family<List<Product>, String>(
  (ref, vendorId) => ApiService.getVendorProducts(vendorId),
);

class VendorDashboard extends ConsumerWidget {
  final String vendorId;

  const VendorDashboard({required this.vendorId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsAsync = ref.watch(vendorProductsProvider(vendorId));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Vendor Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed:
                () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder:
                        (context) => ProductManageScreen(vendorId: vendorId),
                  ),
                ),
          ),
        ],
      ),
      body: productsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(child: Text('Error: $err')),
        data:
            (products) => GridView.builder(
              padding: const EdgeInsets.all(8),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 0.75,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              itemCount: products.length,
              itemBuilder: (context, index) {
                final product = products[index];
                return ProductCard(
                  product: product,
                  onTap: () => _editProduct(context, product),
                );
              },
            ),
      ),
    );
  }

  void _editProduct(BuildContext context, Product product) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder:
            (context) =>
                ProductManageScreen(vendorId: vendorId, product: product),
      ),
    );
  }
}
