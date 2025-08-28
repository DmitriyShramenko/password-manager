import { useEffect, useRef, useState } from 'react'
import { fakeApi } from '../../utils/fakeApi.js'
import { generatePassword } from '../../utils/generatePassword.js'
import './addPasswordModal.css'

export default function AddPasswordModal({ open, onClose, onSubmit }) {
  const [service, setService] = useState('')
  const [password, setPassword] = useState('')
  const [gen, setGen] = useState({ length: 12, useLower: true, useUpper: true, useDigits: true, useSymbols: false })
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const lengthRef = useRef()

  useEffect(() => {
    if (open) {
      setService('')
      setPassword('')
      setGen({ length: 12, useLower: true, useUpper: true, useDigits: true, useSymbols: false })
      setError('')
      setPending(false)
    }
  }, [open])

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setPending(true)
    setError('')
    try {
      const saved = await fakeApi({ id: Date.now().toString(), service, password })
      onSubmit(saved)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Новый пароль</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Сервис</label>
            <input value={service} onChange={e => setService(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Пароль</label>
            <input value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="form-field">
            <label><input type="checkbox" checked={gen.useLower} onChange={e => setGen({ ...gen, useLower: e.target.checked })} /> Строчные</label>
            <label><input type="checkbox" checked={gen.useUpper} onChange={e => setGen({ ...gen, useUpper: e.target.checked })} /> Заглавные</label>
            <label><input type="checkbox" checked={gen.useDigits} onChange={e => setGen({ ...gen, useDigits: e.target.checked })} /> Цифры</label>
            <label><input type="checkbox" checked={gen.useSymbols} onChange={e => setGen({ ...gen, useSymbols: e.target.checked })} /> Символы</label>
          </div>
          <div className="form-field">
            <label>Длина: {gen.length}</label>
            <input type="range" min="6" max="24" value={gen.length} ref={lengthRef} onChange={e => setGen({ ...gen, length: e.target.value })} />
          </div>
          <button type="button" onClick={() => setPassword(generatePassword(gen))}>Сгенерировать</button>
          <button type="submit" style={{ marginLeft: "8px" }} disabled={!service || !password || pending}>
            {pending ? "Сохраняю..." : "Сохранить"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={onClose} style={{ marginTop: "12px" }}>Отмена</button>
      </div>
    </div>
  )
}