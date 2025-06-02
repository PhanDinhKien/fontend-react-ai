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

  // render params thành query string nếu có
  if (method === 'GET' && params && Object.keys(params).length > 0) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    finalUrl += (url.includes('?') ? '&' : '?') + query;
  }

  let headers: Record<string, string> = {};
  if (options.headers) {
    headers = { ...options.headers } as Record<string, string>;
  }

  // Nếu có token thì thêm vào headers
  if (finalToken) headers['Authorization'] = `Bearer ${finalToken}`;

  if (finalLanguage) headers['Accept-Language'] = finalLanguage ?? 'en';
  // Nếu body là FormData thì không set Content-Type, browser sẽ tự set
  const isFormData = body instanceof FormData;

  // Nếu body là JSON thì set Content-Type là application/json
  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH') && !isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const fetchOptions: RequestInit = {
    method,
    ...options,
    headers,
  };
  
  // Nếu body là FormData thì không set body, browser sẽ tự set
  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    fetchOptions.body = isFormData ? body : (typeof body === 'string' ? body : JSON.stringify(body));
  }

  // tiến hành gọi API
  const response = await fetch(finalUrl, fetchOptions);

  // Kiểm tra phản hồi
  if (!response.ok) throw new Error('Network response was not ok');

  // Nếu phản hồi là JSON, parse nó
  return response.json();
}