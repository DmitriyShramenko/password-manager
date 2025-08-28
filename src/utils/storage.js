export const STORAGE_KEY = 'pwdmgr_items_v1'

export const storage = {
  load: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  },
  save: (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
};