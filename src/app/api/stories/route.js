// src/app/api/stories/route.js
import { NextResponse } from 'next/server';
import { getStories } from '../../../lib/stories';

export const revalidate = 60;

export async function GET() {
  try {
    const stories = getStories();
    return NextResponse.json({ stories, total: stories.length });
  } catch {
    return NextResponse.json({ stories: [], total: 0 }, { status: 500 });
  }
}