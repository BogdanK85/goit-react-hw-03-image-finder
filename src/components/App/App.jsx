import { Component } from 'react';
import { fetchNewPictures } from 'API/API';
import { ToastContainer, toast } from 'react-toastify';
import { SectionApp } from 'components/SectionApp/SectionApp';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from 'components/Button/Button';
import { Spiner } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    perPage: 12,

    images: [],
    webformatUrl: [],
    largeImageUrl: '',
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
    const { seachQuery, page, perPage } = this.state;

    try {
      this.setState({ isLoading: true });

      const newPictures = await fetchNewPictures(seachQuery, page, perPage);

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
      pictures: [],
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onModalChange = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onPictureClick = largeImageUrl => {
    this.setState({ largeImageUrl });
    this.onModalChenge();
  };

  render() {
    // const { error, images, isLoading, showModal, modalPictures } = this.state;

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
          <ImageGallery
            newPictures={this.state.images}
            onClick={this.onPictureClick}
          >
            <ImageGalleryItem
              images={this.state.images}
              showModal={this.onPictureClick}
            />
          </ImageGallery>

          {this.state.images.length > 0 && (
            <LoadMoreBtn
              onClick={this.onLoadMore}
              isVisible={!this.state.isLoading}
            />
          )}

          {this.state.isLoading && (
            <Spiner loading={this.state.isLoading} size={125} />
          )}

          {this.state.showModal && (
            <Modal
              showModal={this.state.showModal}
              largeImageUrl={this.state.largeImageUrl}
              newPictures={this.state.images}
            />
          )}
        </SectionApp>
      </>
    );
  }
}
