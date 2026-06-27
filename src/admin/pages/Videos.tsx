import { useState } from 'react';
import { Plus } from 'lucide-react';
import DataTableWrapper from '../components/DataTableWrapper';

export default function Videos() {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const [videos, setVideos] = useState([
    { id: 'v1', title: 'Basic Greetings in English', url: 'https://youtube.com/...', upload_date: '2026-05-12', viewCount: 1542, duration: '05:30' },
    { id: 'v2', title: 'Business English Vocabulary', url: 'https://youtube.com/...', upload_date: '2026-05-18', viewCount: 890, duration: '12:15' },
  ]);

  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'Title', data: 'title' },
    { title: 'URL', data: 'url' },
    { title: 'Views', data: 'viewCount' },
    { title: 'Duration', data: 'duration' },
  ];

  const handleEdit = (id: string) => {
    const v = videos.find(x => x.id === id);
    setSelectedVideo(v);
    setShowModal(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Video Lessons</h2>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => { setSelectedVideo(null); setShowModal(true); }}>
          <Plus size={18} /> Add New Video
        </button>
      </div>

      <div className="card p-4">
        <DataTableWrapper data={videos} columns={columns} onEdit={handleEdit} onDelete={() => {}} />
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(40, 63, 59, 0.5)' }}></div>
          <div className="modal d-block show" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ border: 'var(--beelish-border)', boxShadow: 'var(--beelish-shadow)' }}>
                <div className="modal-header border-bottom border-dark border-3" style={{ backgroundColor: 'var(--beelish-primary)' }}>
                  <h5 className="modal-title fw-bold" style={{ color: 'var(--beelish-secondary)' }}>
                    {selectedVideo ? 'Edit Video' : 'Add New Video'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Title</label>
                    <input type="text" className="form-control border-dark border-2" defaultValue={selectedVideo?.title} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">YouTube URL</label>
                    <input type="text" className="form-control border-dark border-2" defaultValue={selectedVideo?.url} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Duration</label>
                    <input type="text" className="form-control border-dark border-2" defaultValue={selectedVideo?.duration} />
                  </div>
                </div>
                <div className="modal-footer border-top border-dark border-3">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
