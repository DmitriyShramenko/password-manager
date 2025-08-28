import './searchBar.css';

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Поиск по сервисам..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}