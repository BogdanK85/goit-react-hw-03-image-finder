import { Component } from 'react';
import { fetchNewPictures } from 'API/API';
import { SectionApp } from 'components/SectionApp/SectionApp';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreBtn } from 'components/Button/Button';
import { Spiner } from 'components/Loader/Loader';
import Modal from '../Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    perPage: 12,

    images: [],
    webformatURL: [],
    largeImageURL: '',
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.fetchPictures(searchQuery, page);
    }
  }

  fetchPictures = async () => {
    const { searchQuery, page } = this.state;

    try {
      this.setState({ isLoading: true });

      const newPictures = await fetchNewPictures(searchQuery, page);

      if (page === 1) {
        this.setState({ images: newPictures.hits });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...newPictures.hits],
        }));
      }

      if (newPictures.hits.length > 0 && page === 1) {
        toast.success('Your picture found!');
      } else if (newPictures.hits.length === 0) {
        throw new Error();
      }
    } catch (error) {
      toast.error('Does not have pictures at your request. Please try agein..');
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onFormSubmit = searchQuery => {
    if (
      this.state.searchQuery.toLowerCase().trim() ===
      searchQuery.toLowerCase().trim()
    ) {
      return toast.warn(`You are viewing ${searchQuery}`);
    }
    this.setState({
      searchQuery: searchQuery.toLowerCase().trim(),
      page: 1,
      images: [],
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // onModalChange = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  onPictureClick = largeImageURL => {
    this.setState({ isLoading: true, largeImageURL, showModal: true });
    // this.onModalChange();
  };
  onCloseModalClick = () => {
    this.setState({ isLoading: false, showModal: false });
  };
  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <SectionApp>
          <Searchbar onSubmit={this.onFormSubmit} />
          <ImageGallery newPictures={images} onClick={this.onPictureClick} />

          {images.length > 0 && (
            <LoadMoreBtn onClick={this.onLoadMore} isVisible={!isLoading} />
          )}

          {isLoading && <Spiner loading={isLoading} size={125} />}

          {showModal && (
            <Modal
              // showModal={showModal}
              largeImageURL={largeImageURL}
              newPictures={images}
              onCloseModalClick={this.onCloseModalClick}
            />
          )}
        </SectionApp>
      </>
    );
  }
}
