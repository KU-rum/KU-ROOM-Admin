export function ApiInfo() {
  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h3 className="text-sm font-medium text-gray-700">API 정보</h3>
      <div className="mt-2 space-y-1 text-xs text-gray-500">
        <p>
          <span className="inline-block w-16 font-medium">Method:</span>
          <code className="rounded bg-yellow-100 px-1.5 py-0.5 text-yellow-800">
            PATCH
          </code>
        </p>
        <p>
          <span className="inline-block w-16 font-medium">Endpoint:</span>
          <code className="rounded bg-gray-200 px-1.5 py-0.5">
            /places/{'{placeId}'}/sub-name
          </code>
        </p>
      </div>
    </div>
  );
}
