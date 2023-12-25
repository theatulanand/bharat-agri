import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { getCropsAction } from './Actions/Home.actions';
import { ShowAlert } from '../../Components/ShowAlert';
import HomeStyle from './Home.module.css';
import { Card } from './Components/Card/Card';

export const Home = () => {
  const [crops, setCrops] = useState([]);
  const [cropsDataToShow, setCropsDataToShow] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cropsPerPage = 10;

  const getData = async () => {
    try {
      let data = await getCropsAction();
      setCropsDataToShow(data);
      setCrops(data);
    } catch (error) {
      ShowAlert('warning', 'Something went wrong');
      console.log('Err', error);
    }
  };

  const searchCrops = (value) => {
    if (value.trim() === '') {
      // If search input is blank, show all data
      setCropsDataToShow(crops);
    } else {
      let searchResult = crops.filter((crop) => {
        return crop.crop_name.toLowerCase().includes(value.toLowerCase());
      });
      setCropsDataToShow(searchResult);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      searchCrops(searchValue);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchValue, crops]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Get current crops based on current page
  const indexOfLastCrop = currentPage * cropsPerPage;
  const indexOfFirstCrop = indexOfLastCrop - cropsPerPage;
  const currentCrops = cropsDataToShow.slice(indexOfFirstCrop, indexOfLastCrop);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <>
        <div className="search_box">
          <form className="search_section" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search Crops"
              name="search"
              value={searchValue}
              onChange={handleSearchChange}
              required
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <div className="pagination-container">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: Math.ceil(cropsDataToShow.length / cropsPerPage) }, (_, index) => index + 1).map((number) => (
              <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                {number}
              </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(cropsDataToShow.length / cropsPerPage)}>
              Next
            </button>
          </div>
        </div>
        <div className={HomeStyle.cards}>
          {currentCrops.length > 0 ? (
            currentCrops.map((crop) => (
              <Card key={crop.thumbnails.id} cropName={crop.crop_name} cropImage={crop.thumbnails[0].image} />
            ))
          ) : (
            <h1>Not Found</h1>
          )}
        </div>
      </>
    </>
  );
};
