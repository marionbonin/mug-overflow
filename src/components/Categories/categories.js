import
{
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';

import Header from '../Header/header';
import Page from '../Page/page';
import Footer from '../Footer/footer';
import Card from '../ProductCard/productCard';

import './style.scss';

export default function Category() {

  const selectTestValue = 'Nom Catég test';

  return (
    <>
      <Header />
      <Page>
        <h1> Titre Catégorie </h1>
        <div id="dropdown-container">
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
            >
              Catégorie
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="catég 1"
              label="Catégorie"
              placeholder={selectTestValue}
              onChange={() => {
                console.log("appel API et modif de l'affichage des produits au changement de catégorie");
              }}
            >
              <MenuItem value="catég 1">Catég 1
              </MenuItem>
              <MenuItem value="catég 2">Catég 2
              </MenuItem>
              <MenuItem value="catég 3">Catég 3
              </MenuItem>
              <MenuItem value="catég 4">Catég 4
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div id="category-results">
          <Card key="1" className="product-card" />
          <Card key="2" className="product-card" />
          <Card key="3" className="product-card" />
          <Card key="4" className="product-card" />
          <Card key="5" className="product-card" />
          <Card key="6" className="product-card" />
        </div>
      </Page>
      <Footer />
    </>
  );
}
