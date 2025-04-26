import { NativeModules, Platform } from 'react-native';

export interface Point {
  x: number;
  y: number;
}

export interface Frame {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface DetectedObject {
  frame: Frame;
  trackingID?: number;
  labels: ObjectLabel[];
}

export interface ObjectLabel {
  text: string;
  confidence: number;
  index: number;
}

export interface ObjectDetectionOptions {
  /**
   * Favor speed or accuracy when detecting objects.
   *
   * @default 'fast'
   */
  performanceMode?: 'fast' | 'accurate';

  /**
   * Whether to enable multiple objects detection.
   *
   * @default true
   */
  multipleObjects?: boolean;

  /**
   * Whether to enable object tracking across frames.
   *
   * @default false
   */
  trackingEnabled?: boolean;

  /**
   * Classification threshold for detected objects.
   * Only labels with confidence above this threshold will be returned.
   *
   * @default 0.5
   */
  classificationThreshold?: number;

  /**
   * Maximum number of objects to detect.
   *
   * @default 5
   */
  maxObjectsToDetect?: number;
}

const LINKING_ERROR =
  `The package '@react-native-ml-kit/object-detection' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const NativeObjectDetection = NativeModules.ObjectDetection
  ? NativeModules.ObjectDetection
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const ObjectDetection = {
  detect: (
    imageURL: string,
    options: ObjectDetectionOptions = {}
  ): Promise<DetectedObject[]> => {
    return NativeObjectDetection.detect(imageURL, options);
  },
};

export default ObjectDetection;