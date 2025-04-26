# @react-native-ml-kit/smart-replies

React Native On-Device Smart Replies with Google ML Kit

## Getting started

```bash
npm install @react-native-ml-kit/smart-replies --save
```

### Mostly automatic installation

```bash
cd ios && pod install
```

## Usage

```javascript
import SmartReplies from '@react-native-ml-kit/smart-replies';

// Example conversation
const conversation = [
  {
    text: "Hey, how's it going?",
    isLocalUser: false,
    timestamp: Date.now() - 60000 // 1 minute ago
  },
  {
    text: "I'm planning to go to the movies tonight.",
    isLocalUser: false,
    timestamp: Date.now() - 30000 // 30 seconds ago
  }
];

// Generate smart reply suggestions
const generateSmartReplies = async () => {
  try {
    const suggestions = await SmartReplies.suggestReplies(conversation);
    
    console.log('Smart reply suggestions:', suggestions);
    // Example output: [{ text: "What movie?" }, { text: "Have fun!" }, { text: "Sounds good!" }]
    
    // You can use these suggestions in your UI as quick reply buttons
    
  } catch (error) {
    console.error('Smart replies generation failed:', error);
  }
};
```

## API

### suggestReplies(conversation)

Generates smart reply suggestions based on previous conversation messages.

#### Parameters

- `conversation` (array) - Array of message objects, each containing:
  - `text` (string) - The text content of the message
  - `isLocalUser` (boolean) - Whether the message was sent by the local user (true) or received from someone else (false)
  - `timestamp` (number, optional) - Timestamp of the message in milliseconds since epoch. If not provided, the current time will be used.

#### Returns

A Promise that resolves to an array of smart reply suggestions. Each suggestion contains:
- `text` (string) - The text of the suggested reply

## Notes

- The Smart Reply API works best with natural conversational text.
- For optimal results, provide a recent conversation history (last few messages).
- The API may return an empty array if it cannot generate appropriate replies.
- All processing happens on-device, ensuring privacy and offline functionality.

## License

MIT