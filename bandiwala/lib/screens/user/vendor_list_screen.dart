import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bandiwala/models/vendor_model.dart';
import 'package:bandiwala/services/api_service.dart';
import 'package:bandiwala/widgets/rating_widget.dart';

final vendorsProvider = FutureProvider((ref) => ApiService.getVendors());

class VendorListScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vendorsAsync = ref.watch(vendorsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('All Vendors')),
      body: vendorsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(child: Text('Error: $err')),
        data:
            (vendors) => ListView.builder(
              itemCount: vendors.length,
              padding: const EdgeInsets.all(8),
              itemBuilder: (context, index) {
                final vendor = vendors[index];
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 4),
                  child: ListTile(
                    title: Row(
                      children: [
                        Text(vendor.name),
                        if (vendor.isVerified)
                          const Padding(
                            padding: EdgeInsets.only(left: 4),
                            child: Icon(
                              Icons.verified,
                              color: Colors.blue,
                              size: 16,
                            ),
                          ),
                      ],
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          vendor.description,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            RatingWidget(rating: vendor.averageRating),
                            const SizedBox(width: 8),
                            Text(
                              '(${vendor.ratings.length} reviews)',
                              style: Theme.of(context).textTheme.bodySmall,
                            ),
                          ],
                        ),
                      ],
                    ),
                    trailing: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          vendor.location.city,
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                        Text(
                          '${vendor.products.length} products',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ],
                    ),
                    onTap: () {
                      // Navigate to vendor detail screen
                    },
                  ),
                );
              },
            ),
      ),
    );
  }
}
