import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const ASL_ALPHABET = [
  { letter: 'A', description: 'Closed fist with thumb on side', emoji: '✊' },
  { letter: 'B', description: 'Flat hand, fingers together, thumb across palm', emoji: '🖐️' },
  { letter: 'C', description: 'Curved hand forming C shape', emoji: '👌' },
  { letter: 'D', description: 'Index finger up, other fingers touch thumb', emoji: '☝️' },
  { letter: 'E', description: 'Fingers curled, thumb tucked', emoji: '✊' },
  { letter: 'F', description: 'Thumb and index touch, other fingers up', emoji: '👌' },
  { letter: 'G', description: 'Index and thumb extended sideways', emoji: '👈' },
  { letter: 'H', description: 'Index and middle fingers extended sideways', emoji: '✌️' },
  { letter: 'I', description: 'Pinky finger extended up', emoji: '🤙' },
  { letter: 'J', description: 'Pinky draws J shape in air', emoji: '🤙' },
  { letter: 'K', description: 'Index up, middle out, thumb between', emoji: '✌️' },
  { letter: 'L', description: 'Thumb and index form L shape', emoji: '👍' },
  { letter: 'M', description: 'Thumb under three fingers', emoji: '✊' },
  { letter: 'N', description: 'Thumb under two fingers', emoji: '✊' },
  { letter: 'O', description: 'Fingertips touch thumb forming O', emoji: '👌' },
  { letter: 'P', description: 'Like K but pointing down', emoji: '👇' },
  { letter: 'Q', description: 'Like G but pointing down', emoji: '👇' },
  { letter: 'R', description: 'Index and middle crossed', emoji: '🤞' },
  { letter: 'S', description: 'Fist with thumb across fingers', emoji: '✊' },
  { letter: 'T', description: 'Thumb between index and middle', emoji: '✊' },
  { letter: 'U', description: 'Index and middle up together', emoji: '✌️' },
  { letter: 'V', description: 'Index and middle spread apart', emoji: '✌️' },
  { letter: 'W', description: 'Three fingers up', emoji: '🖖' },
  { letter: 'X', description: 'Index finger bent like hook', emoji: '☝️' },
  { letter: 'Y', description: 'Thumb and pinky extended (hang loose)', emoji: '🤙' },
  { letter: 'Z', description: 'Index draws Z shape in air', emoji: '☝️' },
];

export function AlphabetGrid() {
  const [selectedLetter, setSelectedLetter] = useState<typeof ASL_ALPHABET[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {ASL_ALPHABET.map((item, index) => (
          <motion.div
            key={item.letter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            <Card
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow group relative"
              onClick={() => setSelectedLetter(item)}
            >
              <div className="text-center">
                <div className="text-5xl mb-2">{item.emoji}</div>
                <div className="text-2xl font-bold mb-1">{item.letter}</div>
                <Badge variant="secondary" className="text-xs">
                  ASL
                </Badge>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Info className="size-4 text-gray-400" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedLetter} onOpenChange={() => setSelectedLetter(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-3xl">
              <span className="text-5xl">{selectedLetter?.emoji}</span>
              Letter {selectedLetter?.letter}
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Hand Position:</div>
                  <p className="text-gray-700">{selectedLetter?.description}</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Tips:</div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Keep your palm facing forward</li>
                    <li>Hold the position steady for clear recognition</li>
                    <li>Ensure good lighting for better detection</li>
                  </ul>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
