import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';

class LocationCoordinates {
  final double latitude;
  final double longitude;

  LocationCoordinates({required this.latitude, required this.longitude});
}

class LocationService {
  static final Map<String, LocationCoordinates> _cityCoordinates = {
    'Mumbai': LocationCoordinates(latitude: 19.0760, longitude: 72.8777),
    'Delhi': LocationCoordinates(latitude: 28.6139, longitude: 77.2090),
    'Bangalore': LocationCoordinates(latitude: 12.9716, longitude: 77.5946),
    'Chennai': LocationCoordinates(latitude: 13.0827, longitude: 80.2707),
  };

  static Future<LocationCoordinates> getLocationForCity(String city) async {
    return _cityCoordinates[city] ??
        LocationCoordinates(latitude: 0, longitude: 0);
  }

  static Future<LocationCoordinates> getCurrentLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw Exception('Location services are disabled');
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        throw Exception('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      throw Exception('Location permissions are permanently denied');
    }

    final position = await Geolocator.getCurrentPosition();
    return LocationCoordinates(
      latitude: position.latitude,
      longitude: position.longitude,
    );
  }

  static Future<String> getNearestCity(LocationCoordinates coords) async {
    double minDistance = double.infinity;
    String nearestCity = 'Unknown';

    _cityCoordinates.forEach((city, location) {
      final distance = Geolocator.distanceBetween(
        coords.latitude,
        coords.longitude,
        location.latitude,
        location.longitude,
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    });

    return nearestCity;
  }
}
