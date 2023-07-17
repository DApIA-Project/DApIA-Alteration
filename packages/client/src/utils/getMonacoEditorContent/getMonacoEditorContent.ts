export function getMonacoEditorContent(): string {
  const elements = document.getElementsByClassName(
    'view-lines monaco-mouse-cursor-text'
  ) as HTMLCollectionOf<HTMLElement>
  const content = elements[0]?.textContent
  return content ? content : ''
}
