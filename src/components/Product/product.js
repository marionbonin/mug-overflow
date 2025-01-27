import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import FaceIcon from '@mui/icons-material/Face';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import FaceSharpIcon from '@mui/icons-material/FaceSharp';


import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import logoOclockBackMug from 'src/assets/images/mug-mockups/logo_oclock_back_mug.png';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Page from '../Page/page';
import Loading from '../App/Loading';
// import ActiveLastBreadcrumb from '../Breadcrumb/breadcrumb';
import ProductCarousel from './ProductCarousel/productCarousel';
import { fetchSingleProduct } from '../../actions/products';
import { saveSlug } from '../../actions/user';

// import ColorRadioButtons from './ColorPick/colorPick';
import feedbacks from './feedback-data';
import './style.scss';

export default function Product() {
  const dispatch = useDispatch();
  const parameters = useParams();
  const currentSlug = parameters.slug;
  // console.log(currentSlug);

  useEffect(() => {
    dispatch(saveSlug(currentSlug));
    dispatch(fetchSingleProduct());
  }, []);

  const product = useSelector((state) => state.products.singleProductList);
  const isLoading = useSelector((state) => state.products.loading);
  console.log(product);

  // const urlBaseImage = 'http://nicolaslenne-server.eddi.cloud/projet-Mug-Overflow-back/public/uploads/images/';
  // const urlEndImage = product.assetFront;
  // const fullUrlImage = urlBaseImage + urlEndImage;
  const pngExtension = '.jpg';
  const fileName = product.name + pngExtension;

  const onDownloadRecto = () => {
    const link = document.createElement('a');
    console.log(fileName);
    console.log(product.assetFront);
    link.href = product.assetFront;
    link.setAttribute('download', fileName);
    link.setAttribute('target', '_blank');
    link.click();
  };

  const onDownloadVerso = () => {
    const link = document.createElement('a');
    link.download = 'mug-verso.png';
    link.href = logoOclockBackMug;
    link.click();
  };

  // display random feedbacks from feedback-data array
  const array = [];
  while (array.length < 2) {
    const randomNumber = Math.floor(Math.random() * 6);
    if (array.indexOf(randomNumber) === -1) array.push(randomNumber);
  }
  console.log(array);
  const randomKeyOne = array[0];
  const randomKeyTwo = array[1];
  const randomFeedback1 = feedbacks[randomKeyOne];
  const randomFeedback2 = feedbacks[randomKeyTwo];

  if (isLoading) {
    return (
      <>
        <Header />
        <Page>
          <Loading />
        </Page>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Page>
        <div id="product-container">
          <div id="product-details">
            <div className="product-title-box">
              <h1 className="product-title">
                {product.name}
              </h1>
            </div>
            <p className="product-description">
              {product.description}
            </p>
            <div id="product-actions">
              <ProductCarousel
                {...product}
              />
              <div id="buttons-group">
                <div id="buttons-group-warning">
                  <h3>ATTENTION :</h3>
                  <p>
                    Actuellement, et jusqu'à ce que le front-end et le back-end fassent leur
                    réunification façon Koh-Lanta, nous ne pouvons pas te proposer de téléchargement
                    cross-origin ( = demander à notre bouton de te télécharger l'image de ton mug,
                    hébergée ailleurs).
                  </p>
                  <p>
                    Du coup, au clic sur le bouton, l'image recto de ton mug s'ouvrira dans un
                    nouvel onglet. Il ne restera plus qu'à faire un
                    clic droit, puis "enregistrer l'image sous...". Quand on y pense, c'est toi
                    le bouton téléchargement...
                  </p>
                </div>
                <Button
                  variant="contained"
                  id="download-recto"
                  onClick={onDownloadRecto}
                  startIcon={<SaveAltIcon />}
                >
                  Télécharger le recto
                </Button>
                <Button
                  variant="contained"
                  id="download-verso"
                  onClick={onDownloadVerso}
                  startIcon={<SaveAltIcon />}
                >
                  Télécharger le verso
                </Button>
                <Link
                  href="https://www.vistaprint.fr/cadeaux-photo/mugs-personnalises?xnav=__undefined_tile-shell_0_A0Y"
                  target="_blank"
                >
                  <Button
                    variant="contained"
                    id="send-to-printer"
                  >
                    Direction l'imprimeur !
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div id="feedbacks-container">
          <Container id="feedback-container" key="1">
            <div id="feedback-content">
              <h2 className="feedback-title"> Ils ont commandé ce mug (ou pas)... </h2>
              <FaceIcon id="user-feedback-icon" />
              <p id="feedback-author"> {randomFeedback1.author}  </p>
              <p id="user-promo"> {randomFeedback1.promo} </p>
              <p id="feedback-message"> {randomFeedback1.message} </p>
            </div>
          </Container>
          <Container id="feedback-container" key="2">
            <div id="feedback-content">
              <FaceIcon id="user-feedback-icon" />
              <p id="feedback-author"> {randomFeedback2.author}  </p>
              <p id="user-promo"> {randomFeedback2.promo} </p>
              <p id="feedback-message"> {randomFeedback2.message} </p>
            </div>
          </Container>
        </div>
      </Page>
      <Footer />
    </>
  );
}
