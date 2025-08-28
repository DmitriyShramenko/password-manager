import { useEffect, useMemo, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar.jsx'
import PasswordList from '../PasswordList/PasswordList.jsx'
import AddPasswordModal from '../AddPasswordModal/AddPasswordModal.jsx'
import { storage } from '../../utils/storage.js'
import './app.css'

export default function App() {
  const [items, setItems] = useState(() => storage.load())
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    storage.save(items)
  }, [items])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(x => x.service.toLowerCase().includes(q))
  }, [items, query])

  function addItem({ service, password }) {
    const id = crypto.randomUUID()
    setItems(prev => [{ id, service, password }, ...prev])
  }

  function deleteItem(id) {
    setItems(prev => prev.filter(x => x.id !== id))
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text)
      setToast('Скопировано в буфер обмена')
    } catch {
      setToast('Не удалось скопировать')
    } finally {
      setTimeout(() => setToast(''), 1200)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Менеджер паролей</h1>
        </div>

        <div className="search-bar--container">
          <div className="search-bar--button">
            <SearchBar value={query} onChange={setQuery} />
            <button onClick={() => setOpen(true)}>Добавить</button>
          </div>
        </div>
      </header>

      <PasswordList items={filtered} onCopy={copyText} onDelete={deleteItem} />

      <AddPasswordModal open={open} onClose={() => setOpen(false)} onSubmit={addItem} />

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
};