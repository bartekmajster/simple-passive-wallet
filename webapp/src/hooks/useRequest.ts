import { useMemo, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from 'types/service.type';
import { useTranslation } from 'react-i18next';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';

const defaultOptions = {
  defaultData: null,
  successToast: null,
  failureToast: true,
  successCallback: null,
  failureCallback: null,
};

interface UseRequestOptions<Response> {
  defaultData?: AxiosResponse<Response> | null;
  successToast?: string | null;
  failureToast?: boolean;
  successCallback?: ((data: AxiosResponse<Response>) => void) | null;
  failureCallback?: ((error: ErrorResponse) => void) | null;
}

interface State<Response> {
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  data: AxiosResponse<Response | any> | null;
  error: AxiosError<ErrorResponse> | null;
}

interface UseRequestReturn<Request, Response> extends State<Response> {
  request: (args_0: Request) => Promise<AxiosResponse<Response, any> | null>;
}

const useRequest = <Request, Response>(
  request: (args_0: Request) => Promise<Promise<AxiosResponse<Response, any>>>,
  {
    defaultData = defaultOptions.defaultData,
    successToast = defaultOptions.successToast,
    failureToast = defaultOptions.failureToast,
    successCallback = defaultOptions.successCallback,
    failureCallback = defaultOptions.failureCallback,
  }: UseRequestOptions<Response> = defaultOptions,
): UseRequestReturn<Request, Response> => {
  const { t } = useTranslation();

  const initialState = useMemo(
    () => ({
      isLoading: false,
      isLoaded: false,
      isError: false,
      data: defaultData,
      error: null,
    }),
    [defaultData],
  );

  const [state, setState] = useState<State<Response>>(initialState);

  const service = async (args_0: Request) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const data = await request(args_0);

      setState({ ...initialState, data, isLoaded: true });

      if (successToast) {
        showSuccessToast(successToast);
      }

      if (successCallback) successCallback(data);

      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      setState({ ...initialState, isLoaded: true, isError: true, error });

      if (failureCallback && error.response) failureCallback(error.response.data);

      if (failureToast) {
        showErrorToast(error.response?.data?.message ?? t('service.unknown_error'));
      }

      return defaultData;
    }
  };

  return {
    ...state,
    request: service,
  };
};

export default useRequest;
