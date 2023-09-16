import { Component } from 'react';
import { fetchNewPictures } from 'API/API';
import { ToastContainer, toast } from 'react-toastify';
import { SectionApp } from 'components/SectionApp/SectionApp';

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
        this.setState({ pictures: newPictures.hits });
      } else {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...newPictures.hits],
        }));
      }

      if (newPictures.hits.length > 0 && page === 1) {
        toast.success('Your picture found!');
      } else if (newPictures.hits.length === 0) {
        throw new Error();
      }
    } catch (error) {
      toast.error('Does not have pictures at your request. Please try agein..');
      this.setState({ errer: error.message });
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

  render() {
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
        </SectionApp>
      </>
    );
  }
}
