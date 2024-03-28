import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="border-pink-700 border-2 gap-4 p-4 sm:p-8 flex flex-col md:flex-row rounded-lg">
        <img
          src={images[active]}
          alt="animal"
          className="w-full md:w-11/12 h-64 md:h-screen rounded"
        />
        <div className="smaller w-full sm:w-1/12 flex flex-row md:flex-col gap-4 sm:gap-6 mt-4 sm:mt-0 overflow-auto">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              data-index={index}
              onClick={this.handleIndexClick}
              className={`block mx-auto h-24 rounded sm:mx-0 sm:flex-shrink-0 ${index === active ? "border-black border opacity-80" : ""}`}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
