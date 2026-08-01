'use client'

import type { ContentBlock, TableCell, TextPart } from '@/content/ContentBlock'
import { TABLE_LABEL_COLUMN_CLASS, TABLE_LAST_COLUMN_MAX_WIDTH_CLASS } from '@/lib/constants'
import { IS_DEV } from '@/lib/env'

//----------------------------------------------------------------------------------------------
//  renderParagraphText — a plain string renders as-is; a TextPart[] renders each part, with
//  { bold: string } parts wrapped in <strong>
//----------------------------------------------------------------------------------------------
function renderParagraphText(text: string | TextPart[]) {
  if (typeof text === 'string') return text
  return text.map((part, partIndex) =>
    typeof part === 'string' ? (
      <span key={partIndex}>{part}</span>
    ) : (
      <strong key={partIndex}>{part.bold}</strong>
    )
  )
}

//----------------------------------------------------------------------------------------------
//  cellPlainText — the plain-text form of a table cell, used only for the '#'-prefix style check
//----------------------------------------------------------------------------------------------
function cellPlainText(cell: TableCell) {
  if (typeof cell === 'string') return cell
  if (Array.isArray(cell)) return cell.map((part) => (typeof part === 'string' ? part : part.bold)).join('')
  return cell.list.join(' ')
}

//----------------------------------------------------------------------------------------------
//  renderCell — a { list } cell renders as a bulleted-free <ul>; everything else falls back to
//  renderParagraphText
//----------------------------------------------------------------------------------------------
function renderCell(cell: TableCell) {
  if (typeof cell === 'object' && !Array.isArray(cell)) {
    const spacing = cell.spacing ?? 'tight'
    const ulClass = [
      spacing === 'bullets' ? 'list-disc pl-5' : 'list-none',
      spacing === 'blank-line' ? 'space-y-4' : 'space-y-1',
    ].join(' ')
    return (
      <ul className={ulClass}>
        {cell.list.map((item, itemIndex) => (
          <li key={itemIndex}>{item}</li>
        ))}
      </ul>
    )
  }
  return renderParagraphText(cell)
}

//----------------------------------------------------------------------------------------------
//  renderBlock — turns one ContentBlock into JSX, unwrapped (no dev click-wrapper)
//----------------------------------------------------------------------------------------------
function renderBlock(block: ContentBlock) {
  if (block.type === 'paragraph') return <p>{renderParagraphText(block.text)}</p>
  if (block.type === 'heading') {
    return <h3 className='font-semibold text-gray-800 mb-1'>{block.text}</h3>
  }
  if (block.type === 'list') {
    return (
      <div className='border border-gray-200 rounded bg-blue-50 p-3'>
        <ul className='list-none space-y-1'>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }
  if (block.type === 'code') {
    return (
      <pre className='bg-gray-50 border border-gray-200 rounded p-3 text-xs overflow-x-auto'>
        {block.text}
      </pre>
    )
  }
  const lastColumnIndex = block.headers.length - 1
  return (
    <div className='inline-block max-w-full border border-gray-200 rounded bg-blue-50 p-3 overflow-x-auto'>
      <table className='text-left border-collapse'>
        <thead>
          <tr className='border-b border-gray-300 bg-blue-200'>
            {block.headers.map((header, headerIndex) => (
              <th
                key={headerIndex}
                className={[
                  'py-1 pr-4 font-semibold text-gray-800',
                  headerIndex === 0 ? TABLE_LABEL_COLUMN_CLASS : '',
                  headerIndex === lastColumnIndex ? TABLE_LAST_COLUMN_MAX_WIDTH_CLASS : '',
                ].join(' ')}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className='border-b border-gray-100'>
              {row.map((cell, cellIndex) => {
                const plainText = cellPlainText(cell)
                return (
                  <td
                    key={cellIndex}
                    className={[
                      'py-1 pr-4 align-top',
                      cellIndex === 0 ? 'w-80 whitespace-nowrap' : '',
                      cellIndex === lastColumnIndex ? 'max-w-5xl' : '',
                      cellIndex === 0 || plainText.startsWith('#') ? 'font-semibold text-gray-800' : '',
                      plainText.startsWith('#') ? 'font-mono' : '',
                    ].join(' ')}
                  >
                    {renderCell(cell)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

//----------------------------------------------------------------------------------------------
//  openInEditor — dev-only: asks the server to open sourcePath in the running editor
//----------------------------------------------------------------------------------------------
function openInEditor(sourcePath: string) {
  fetch('/api/dev/open-editor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filePath: sourcePath }),
  })
}

//----------------------------------------------------------------------------------------------
//  ContentSection — generic renderer for a ContentBlock[] array; the only place that turns
//  content data into JSX, so no tab hardcodes its own markup
//----------------------------------------------------------------------------------------------
export default function ContentSection({ blocks, sourcePath }: { blocks: ContentBlock[]; sourcePath: string }) {
  return (
    <div className='space-y-4 text-sm text-gray-700'>
      {blocks.map((block, index) => {
        const rendered = renderBlock(block)
        if (!IS_DEV) return <div key={index}>{rendered}</div>
        return (
          <div
            key={index}
            onClick={() => openInEditor(sourcePath)}
            className='cursor-pointer hover:bg-yellow-50 rounded transition-colors'
          >
            {rendered}
          </div>
        )
      })}
    </div>
  )
}
