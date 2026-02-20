'use client';

import { GamePage } from '@/components/pages/GamePage';

export default function Game({ params }: { params: { levelId: string } }) {
  return <GamePage levelId={params.levelId} />;
}
