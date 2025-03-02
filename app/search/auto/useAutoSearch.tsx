import { AutoFilterOptions, FetchFilterOptionsParams } from '@/common-types/AutoFilterOptions';
import { AutoSearchParams } from '@/common-types/AutoSearchParams';
import { Vehicle } from '@/common-types/Vehicle';
import { removeMarkFromPrice } from '@/utils/formatters';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

export const useAutoSearch = () => {
  const [options, setOptions] = useState<AutoFilterOptions>({
    brands: [],
    models: [],
    price: [],
    year: [],
  });

  const fetchOptions = async (params: FetchFilterOptionsParams) => {
    const response: AxiosResponse<Vehicle[]> = await axios.get('/api/vehicles', {
      params: {
        b: params.brand,
        md: params.model,
        y: params.year,
        p: removeMarkFromPrice(params.price!),
      },
    });
    const uniqeBrandNames = Array.from(new Set(response.data.map(item => item.brand)));
    const uniqeModelsNames = response.data.map(item => item.modelName);
    const uniqePriceValues = Array.from(new Set(response.data.map(item => item.price.toString())));
    const uniqeYearValues = Array.from(new Set(response.data.map(item => item.year.toString())));

    setOptions(prev => ({
      ...prev,
      brands: uniqeBrandNames,
      models: uniqeModelsNames,
      price: uniqePriceValues,
      year: uniqeYearValues,
    }));
  };

  const searchVehicles = async (values: AutoSearchParams): Promise<Vehicle[]> => {
    const params = new URLSearchParams();

    if (values.search?.trim()) {
      params.append('s', values.search);
    }

    if (values.brand) {
      params.append('b', values.brand);
    }

    if (values.model) {
      params.append('md', values.model);
    }

    if (values.price) {
      params.append('p', removeMarkFromPrice(values.price));
    }

    if (values.year) {
      params.append('y', values.year);
    }

    const response = await axios.get(`/api/vehicles`, { params });
    return response.data;
  };

  return { fetchOptions, searchVehicles, options };
};
