
import './App.css';
import { Header } from './components/Header/Header';
import { CharacterTable } from './containers/CharacterTable';
import { FilterContainer } from './containers/FilterContainer';
import { StateProvider } from './store/store';

function App() {
  return (
    <StateProvider>
      <Header title = "Rick & Morty Characters app"/>
      <FilterContainer />
      <CharacterTable />
    </StateProvider>
  );
}

export default App;
