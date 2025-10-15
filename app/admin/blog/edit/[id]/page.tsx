// Blog edit UI removed — file deleted. No exports here to register a route.

export const __admin_blog_edit_removed_marker = true;
                    <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      YouTube Video URL
                    </label>
                    <input
                      type="url"
                      id="youtubeUrl"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {youtubeUrl && extractYouTubeVideoId(youtubeUrl) && (
                      <div className="mt-2 p-2 bg-gray-800 rounded">
                        <p className="text-xs text-green-400 mb-2">Preview:</p>
                        <div className="aspect-video bg-black rounded">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${extractYouTubeVideoId(youtubeUrl)}`}
                            title="YouTube preview"
                            frameBorder="0"
                            allowFullScreen
                            className="rounded"
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="spotifyUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      Spotify Podcast URL
                    </label>
                    <input
                      type="url"
                      id="spotifyUrl"
                      value={spotifyUrl}
                      onChange={(e) => setSpotifyUrl(e.target.value)}
                      placeholder="https://open.spotify.com/episode/..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {spotifyUrl && extractSpotifyEpisodeId(spotifyUrl) && (
                      <div className="mt-2 p-2 bg-gray-800 rounded">
                        <p className="text-xs text-green-400 mb-2">Preview:</p>
                        <iframe
                          src={`https://open.spotify.com/embed/episode/${extractSpotifyEpisodeId(spotifyUrl)}?utm_source=generator`}
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="rounded"
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Art Gallery (Images)
                  </label>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      {uploading && (
                        <p className="text-xs text-blue-400 mt-1">Uploading images...</p>
                      )}
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={imageUrl}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded border border-gray-600"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Publishing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={published}
                          onChange={(e) => setPublished(e.target.checked)}
                          className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          Published
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-white mb-2">Post Info</h4>
                  <div className="space-y-2 text-xs text-gray-400">
                    <div>Created: {new Date(post.createdAt).toLocaleDateString()}</div>
                    <div>Updated: {new Date(post.updatedAt).toLocaleDateString()}</div>
                    <div>ID: {post.id}</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={saving || uploading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md font-medium"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <Link
                      href="/admin/blog"
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium text-center"
                    >
                      Cancel
                    </Link>
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium text-center"
                    >
                      Preview Post
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}