import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/models/vendor_model.dart';
import 'package:bandiwala/services/api_service.dart';

final vendorsProvider = FutureProvider((ref) => ApiService.getVendors());

class VendorManageScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vendorsAsync = ref.watch(vendorsProvider);

    return vendorsAsync.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (err, stack) => Center(child: Text('Error: $err')),
      data:
          (vendors) => ListView.builder(
            itemCount: vendors.length,
            itemBuilder: (context, index) {
              final vendor = vendors[index];
              return Card(
                margin: const EdgeInsets.all(8.0),
                child: ListTile(
                  title: Text(vendor.name),
                  subtitle: Text(vendor.email),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        vendor.isVerified ? 'Verified' : 'Pending',
                        style: TextStyle(
                          color:
                              vendor.isVerified ? Colors.green : Colors.orange,
                        ),
                      ),
                      if (!vendor.isVerified)
                        TextButton(
                          onPressed: () async {
                            try {
                              await ApiService.verifyVendor(vendor.id);
                              ref.refresh(vendorsProvider);
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text('Vendor verified successfully'),
                                ),
                              );
                            } catch (e) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text('Error: $e')),
                              );
                            }
                          },
                          child: const Text('Verify'),
                        ),
                    ],
                  ),
                  onTap: () => _showVendorDetails(context, vendor),
                ),
              );
            },
          ),
    );
  }

  void _showVendorDetails(BuildContext context, Vendor vendor) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: Text(vendor.name),
            content: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Phone: ${vendor.phoneNumber}'),
                  const SizedBox(height: 8),
                  Text('Description: ${vendor.description}'),
                  const SizedBox(height: 8),
                  Text('Location: ${vendor.location.city}'),
                  const SizedBox(height: 8),
                  Text('Rating: ${vendor.averageRating.toStringAsFixed(1)}'),
                  const SizedBox(height: 8),
                  Text('Products: ${vendor.products.length}'),
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
