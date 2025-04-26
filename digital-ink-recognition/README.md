# @react-native-ml-kit/digital-ink-recognition

React Native On-Device Digital Ink Recognition with Google ML Kit

## Getting started

```bash
npm install @react-native-ml-kit/digital-ink-recognition --save
```

### Mostly automatic installation

```bash
cd ios && pod install
```

## Usage

```javascript
import DigitalInkRecognition from '@react-native-ml-kit/digital-ink-recognition';

// Example of collecting strokes from a drawing canvas
const strokes = [
  {
    points: [
      { x: 100, y: 100, t: 1000 }, // x, y coordinates and timestamp
      { x: 120, y: 110, t: 1100 },
      { x: 140, y: 120, t: 1200 },
      // ... more points
    ]
  },
  // ... more strokes
];

// Check if a language model is available
const checkLanguageModel = async () => {
  try {
    const isAvailable = await DigitalInkRecognition.isLanguageModelAvailable('en');
    console.log('English model available:', isAvailable);
    
    if (!isAvailable) {
      // Download the model if not available
      await DigitalInkRecognition.downloadLanguageModel('en');
      console.log('English model downloaded successfully');
    }
  } catch (error) {
    console.error('Error checking/downloading model:', error);
  }
};

// Recognize handwritten text
const recognizeHandwriting = async () => {
  try {
    const results = await DigitalInkRecognition.recognize(
      strokes,
      {
        languageCode: 'en',
        maxResultCount: 3,
        autoDownloadModel: true
      }
    );
    
    console.log('Recognition results:', results);
    // Each result contains:
    // - text: The recognized text
    // - score: Confidence score
    
  } catch (error) {
    console.error('Recognition failed:', error);
  }
};

// Get all available language models
const getAvailableLanguages = async () => {
  try {
    const languages = await DigitalInkRecognition.getAvailableLanguages();
    console.log('Available languages:', languages);
  } catch (error) {
    console.error('Error getting available languages:', error);
  }
};
```

## API

### recognize(strokes, options)

Recognizes handwritten text from a series of strokes.

#### Parameters

- `strokes` (array) - Array of stroke objects, each containing:
  - `points` (array) - Array of point objects, each containing:
    - `x` (number) - X coordinate
    - `y` (number) - Y coordinate
    - `t` (number) - Timestamp in milliseconds
- `options` (object) - Recognition options:
  - `languageCode` (string) - BCP-47 language code (e.g., 'en', 'en-US', 'ja'). Default: 'en'.
  - `maxResultCount` (number) - Maximum number of recognition candidates to return. Default: 1.
  - `autoDownloadModel` (boolean) - Whether to automatically download the language model if not available. Default: true.

#### Returns

A Promise that resolves to an array of recognition candidates. Each candidate contains:
- `text` (string) - The recognized text
- `score` (number) - Confidence score (0.0 - 1.0)

### isLanguageModelAvailable(languageCode)

Checks if a language model is downloaded and available for use.

#### Parameters

- `languageCode` (string) - BCP-47 language code

#### Returns

A Promise that resolves to a boolean indicating if the model is available.

### downloadLanguageModel(languageCode)

Downloads a language model for digital ink recognition.

#### Parameters

- `languageCode` (string) - BCP-47 language code

#### Returns

A Promise that resolves when the model is downloaded.

### deleteLanguageModel(languageCode)

Deletes a downloaded language model.

#### Parameters

- `languageCode` (string) - BCP-47 language code

#### Returns

A Promise that resolves when the model is deleted.

### getAvailableLanguages()

Gets all available language models that can be downloaded.

#### Returns

A Promise that resolves to an array of language codes (strings).

## License

MIT