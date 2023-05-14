function SearchBar() {
	return (
		<>
			<form className="search-box">
				<button className="btn-search">
					<img className="search-icon" src="search-icon.png" alt="" />
				</button>
				<input
					type="text"
					className="input-search"
					placeholder="Busca los posts de un tecler..."
				/>
			</form>
		</>
	);
}

export default SearchBar;