# @react-native-ml-kit/object-detection

React Native On-Device Object Detection and Tracking with Google ML Kit

## Getting started

```bash
npm install @react-native-ml-kit/object-detection --save
```

### Mostly automatic installation

```bash
cd ios && pod install
```

## Usage

```javascript
import ObjectDetection from '@react-native-ml-kit/object-detection';

// Detect objects in an image
const detectObjects = async (imageURL) => {
  try {
    const objects = await ObjectDetection.detect(
      imageURL,
      {
        performanceMode: 'fast', // or 'accurate'
        multipleObjects: true,
        trackingEnabled: true,
        classificationThreshold: 0.7,
        maxObjectsToDetect: 10
      }
    );
    
    console.log('Detected objects:', objects);
    // Each object contains:
    // - frame: { left, top, width, height }
    // - trackingID (if tracking is enabled)
    // - labels: [{ text, confidence, index }, ...]
    
  } catch (error) {
    console.error('Object detection failed:', error);
  }
};
```

## API

### detect(imageURL, options)

Detects objects in the provided image.

#### Parameters

- `imageURL` (string) - The URL of the image to process. Can be a remote URL or a local file URL (starting with `file://`).
- `options` (object) - Detection options:
  - `performanceMode` ('fast' | 'accurate') - Whether to prioritize speed or accuracy. Default: 'fast'.
  - `multipleObjects` (boolean) - Whether to detect multiple objects. Default: true.
  - `trackingEnabled` (boolean) - Whether to enable object tracking across frames. Default: false.
  - `classificationThreshold` (number) - Minimum confidence threshold for classification results (0.0 - 1.0). Default: 0.5.
  - `maxObjectsToDetect` (number) - Maximum number of objects to detect. Default: 5.

#### Returns

A Promise that resolves to an array of detected objects. Each object contains:
- `frame` - The bounding box of the detected object: `{ left, top, width, height }`.
- `trackingID` - A unique ID for tracking the object across frames (only if tracking is enabled).
- `labels` - An array of classification labels: `[{ text, confidence, index }, ...]`.

## License

MIT