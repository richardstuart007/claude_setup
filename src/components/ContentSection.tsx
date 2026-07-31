import type { ContentBlock, TextPart } from '@/content/ContentBlock'

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
function cellPlainText(cell: string | TextPart[]) {
  if (typeof cell === 'string') return cell
  return cell.map((part) => (typeof part === 'string' ? part : part.bold)).join('')
}

//----------------------------------------------------------------------------------------------
//  ContentSection — generic renderer for a ContentBlock[] array; the only place that turns
//  content data into JSX, so no tab hardcodes its own markup
//----------------------------------------------------------------------------------------------
export default function ContentSection({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className='space-y-4 text-sm text-gray-700'>
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') return <p key={index}>{renderParagraphText(block.text)}</p>
        if (block.type === 'heading') {
          return (
            <h3 key={index} className='font-semibold text-gray-800 mb-1'>
              {block.text}
            </h3>
          )
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className='list-disc pl-5 space-y-1'>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )
        }
        if (block.type === 'code') {
          return (
            <pre key={index} className='bg-gray-50 border border-gray-200 rounded p-3 text-xs overflow-x-auto'>
              {block.text}
            </pre>
          )
        }
        const lastColumnIndex = block.headers.length - 1
        return (
          <table key={index} className='text-left border-collapse'>
            <thead>
              <tr className='border-b border-gray-300'>
                {block.headers.map((header, headerIndex) => (
                  <th
                    key={headerIndex}
                    className={[
                      'py-1 pr-4 font-semibold text-gray-800',
                      headerIndex === 0 ? 'w-80 whitespace-nowrap' : '',
                      headerIndex === lastColumnIndex ? 'max-w-5xl' : '',
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
                        {renderParagraphText(cell)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )
      })}
    </div>
  )
}
