import EmptyState from '../EmptyState/EmptyState.jsx';
import './passwordList.css';

export default function PasswordList({ items, onCopy, onDelete }) {
  if (!items.length) return <EmptyState />

  return (
    <ul className="password-list">
      {items.map(item => (
        <li key={item.id} className="password-item">
          <div className="password-info">
            <div className="password-service">{item.service}</div>
            <div className="password-value">{item.password}</div>
          </div>
          <div>
            <button onClick={() => onCopy(item.password)}>Копировать</button>
            <button onClick={() => onDelete(item.id)} style={{ marginLeft: "8px", background: "red" }}>Удалить</button>
          </div>
        </li>
      ))}
    </ul>
  )
};