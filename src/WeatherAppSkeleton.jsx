import {
    Navbar,
    Parentcontainer,
    Forecastcontainer,
    ForecastchildContainer,
    Heading,
    Weatherinformation,
    Image,
    Heading1,
    Input,
    Overallcontainer,
    Buttonelemnt,
    Imagecontainer,
    Spinner,
  } from './styledcomponent.jsx';
  import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';




const WeatherInformationSkeleton = () => (
      <Weatherinformation>
        <Imagecontainer>
          <h2>
            <Skeleton height={20} width={200} />
          </h2>
          <Skeleton height={200} width={200} />
        </Imagecontainer>
        <Imagecontainer>
          <p>
            <Skeleton height={20} width={200} />
          </p>
          <p>
            <Skeleton height={20} width={200} />
          </p>
          <p>
            <Skeleton height={20} width={200} />
          </p>
          <p>
            <Skeleton height={20} width={200} />
          </p>
          <p>
            <Skeleton height={20} width={200} />
          </p>
          <Link to="/forecast">to forecastpage</Link>
        </Imagecontainer>
      </Weatherinformation>
    );
    
    const ForecastchildContainerSkeleton = () => (
      <ForecastchildContainer>
        <h3>
          <Skeleton height={20} width={200} />
        </h3>
        <p>
          <Skeleton height={20} width={200} />
        </p>
        <p>
          <Skeleton height={20} width={200} />
        </p>
        <p>
          <Skeleton height={20} width={200} />
        </p>
        <p>
          <Skeleton height={20} width={200} />
        </p>
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <Skeleton height={50} width={200} />
          </div>
        ))}
      </ForecastchildContainer>
    );
    
     export const WeatherAppSkeleton = () => (

        <Overallcontainer>
              <WeatherInformationSkeleton />
              {[...Array(5)].map((_, index) => (
                <ForecastchildContainerSkeleton key={index} />
              ))}
            </Overallcontainer>
    
    );
    

   