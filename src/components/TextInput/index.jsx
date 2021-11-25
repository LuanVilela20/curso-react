import "./styles.css"

export const TextInput = ({handleChange, searchValue}) => {
  return (
    <input class = "text-input"
      onChange={handleChange}
      value={searchValue} 
      type="search"
      placeholder="Type your search"
    />    
  ); 
}