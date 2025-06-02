export async function callApi({ url, token, method = 'GET', body, options = {}, params }: {
  url: string;
  token?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  options?: RequestInit;
  params?: Record<string, any>;
}) {
  // Lấy token từ localStorage nếu không truyền vào
  const localToken = localStorage.getItem('token');
  const finalToken = token || localToken || undefined;

  // Luôn lấy language từ localStorage
  const finalLanguage = localStorage.getItem('language') || undefined;

  // Nếu là GET và có params, nối params vào url
  let finalUrl = url;
  if (method === 'GET' && params && Object.keys(params).length > 0) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    finalUrl += (url.includes('?') ? '&' : '?') + query;
  }

  let headers: Record<string, string> = {};
  if (options.headers) {
    headers = { ...options.headers } as Record<string, string>;
  }
  if (finalToken) headers['Authorization'] = `Bearer ${finalToken}`;
  if (finalLanguage) headers['Accept-Language'] = finalLanguage;
  // Nếu body là FormData thì không set Content-Type, browser sẽ tự set
  const isFormData = body instanceof FormData;
  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH') && !isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  const fetchOptions: RequestInit = {
    method,
    ...options,
    headers,
  };
  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    fetchOptions.body = isFormData ? body : (typeof body === 'string' ? body : JSON.stringify(body));
  }
  const response = await fetch(finalUrl, fetchOptions);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}