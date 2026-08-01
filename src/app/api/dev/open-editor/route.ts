import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import launchEditor from 'launch-editor'
import { IS_DEV } from '@/lib/env'

//--------------------------------------------------------------------------------
//  POST — dev-only: opens a project-relative file path in the running editor
//--------------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  if (!IS_DEV) {
    return NextResponse.json({ error: 'Not available' }, { status: 403 })
  }

  const { filePath } = await request.json()
  const absolutePath = path.join(/*turbopackIgnore: true*/ process.cwd(), filePath)
  launchEditor(absolutePath)

  return NextResponse.json({ ok: true })
}
