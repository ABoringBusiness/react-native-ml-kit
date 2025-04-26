import { NativeModules, Platform } from 'react-native';

export interface StrokePoint {
  x: number;
  y: number;
  t: number; // timestamp in ms
}

export interface Stroke {
  points: StrokePoint[];
}

export interface DigitalInkRecognitionOptions {
  /**
   * The language code for recognition.
   * Uses BCP-47 format (e.g., 'en', 'en-US', 'ja', 'zh-Hans', etc.)
   * 
   * @default 'en'
   */
  languageCode?: string;

  /**
   * The number of recognition candidates to return.
   * 
   * @default 1
   */
  maxResultCount?: number;

  /**
   * Whether to automatically download the language model if not available.
   * 
   * @default true
   */
  autoDownloadModel?: boolean;
}

export interface RecognitionCandidate {
  text: string;
  score: number;
}

const LINKING_ERROR =
  `The package '@react-native-ml-kit/digital-ink-recognition' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const NativeDigitalInkRecognition = NativeModules.DigitalInkRecognition
  ? NativeModules.DigitalInkRecognition
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const DigitalInkRecognition = {
  /**
   * Recognizes handwritten text from a series of strokes.
   * 
   * @param strokes Array of strokes, each containing points with x, y coordinates and timestamp
   * @param options Recognition options
   * @returns Promise resolving to an array of recognition candidates
   */
  recognize: (
    strokes: Stroke[],
    options: DigitalInkRecognitionOptions = {}
  ): Promise<RecognitionCandidate[]> => {
    return NativeDigitalInkRecognition.recognize(strokes, options);
  },

  /**
   * Checks if a language model is downloaded and available for use.
   * 
   * @param languageCode BCP-47 language code
   * @returns Promise resolving to a boolean indicating if the model is available
   */
  isLanguageModelAvailable: (
    languageCode: string
  ): Promise<boolean> => {
    return NativeDigitalInkRecognition.isLanguageModelAvailable(languageCode);
  },

  /**
   * Downloads a language model for digital ink recognition.
   * 
   * @param languageCode BCP-47 language code
   * @returns Promise resolving when the model is downloaded
   */
  downloadLanguageModel: (
    languageCode: string
  ): Promise<void> => {
    return NativeDigitalInkRecognition.downloadLanguageModel(languageCode);
  },

  /**
   * Deletes a downloaded language model.
   * 
   * @param languageCode BCP-47 language code
   * @returns Promise resolving when the model is deleted
   */
  deleteLanguageModel: (
    languageCode: string
  ): Promise<void> => {
    return NativeDigitalInkRecognition.deleteLanguageModel(languageCode);
  },

  /**
   * Gets all available language models that can be downloaded.
   * 
   * @returns Promise resolving to an array of language codes
   */
  getAvailableLanguages: (): Promise<string[]> => {
    return NativeDigitalInkRecognition.getAvailableLanguages();
  }
};

export default DigitalInkRecognition;