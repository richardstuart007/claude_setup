//==============================================================================================
//  1) DESCRIPTION
//    POST — dev-only API route. Opens a project-relative file path in the
//    running editor via launch-editor.
//
//    Parameters:
//      request — the incoming request; JSON body { filePath: string }, a path
//                relative to the project root
//
//    Returns:
//      JSON { ok: true } once the editor has been launched, or
//      { error: 'Not available' } with HTTP 403 when IS_DEV is false
//==============================================================================================

import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import launchEditor from 'launch-editor'
import { IS_DEV } from '@/lib/env'

export async function POST(request: NextRequest) {
  if (!IS_DEV) {
    return NextResponse.json({ error: 'Not available' }, { status: 403 })
  }

  const { filePath } = await request.json()
  const absolutePath = path.join(/*turbopackIgnore: true*/ process.cwd(), filePath)
  launchEditor(absolutePath)

  return NextResponse.json({ ok: true })
}
