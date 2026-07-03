import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import DataTableWrapper from '../components/DataTableWrapper';
import { getVideos, createVideo, updateVideo, deleteVideo } from '../../api/videosApi';

const TimeInput = ({ value, onChange }: { value: number, onChange: (val: number) => void }) => {
  const h = Math.floor(value / 3600);
  const m = Math.floor((value % 3600) / 60);
  const s = value % 60;

  return (
    <div>
      <div className="d-flex gap-1 align-items-center">
        <input type="number" min="0" placeholder="HH" className="form-control border-dark p-1 text-center" style={{ width: '45px', fontSize: '0.8rem' }} value={h === 0 ? '' : h} onChange={e => onChange((Number(e.target.value) || 0) * 3600 + m * 60 + s)} />
        <span className="fw-bold">:</span>
        <input type="number" min="0" max="59" placeholder="MM" className="form-control border-dark p-1 text-center" style={{ width: '45px', fontSize: '0.8rem' }} value={h === 0 && m === 0 ? '' : m} onChange={e => onChange(h * 3600 + (Number(e.target.value) || 0) * 60 + s)} />
        <span className="fw-bold">:</span>
        <input type="number" min="0" max="59" step="0.1" placeholder="SS" className="form-control border-dark p-1 text-center" style={{ width: '55px', fontSize: '0.8rem' }} value={value === 0 && s === 0 ? '' : Number(s.toFixed(1))} onChange={e => onChange(h * 3600 + m * 60 + (Number(e.target.value) || 0))} />
      </div>
      <div className="text-muted mt-1 text-center" style={{ fontSize: '10px' }}>({Number(value).toFixed(1)}s)</div>
    </div>
  );
};

export default function Videos() {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = Info, 2 = Transcript

  // Form State
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [duration, setDuration] = useState(0);
  const [transcripts, setTranscripts] = useState<any[]>([]);

  const durHours = Math.floor(duration / 3600);
  const durMinutes = Math.floor((duration % 3600) / 60);
  const durSeconds = duration % 60;

  const handleDurationChange = (h: number, m: number, s: number) => {
    setDuration((h || 0) * 3600 + (m || 0) * 60 + (s || 0));
  };

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'Title', data: 'title' },
    { title: 'URL', data: 'url' },
    { title: 'Views', data: 'viewCount' },
    { title: 'Duration (s)', data: 'duration' },
  ];

  const handleEdit = (id: string) => {
    const v = videos.find(x => x.id === id);
    if (v) {
      setSelectedVideo(v);
      setTitle(v.title || '');
      setUrl(v.url || '');
      setDuration(v.duration || 0);
      setTranscripts(v.transcripts || []);
      setStep(1);
      setShowModal(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo(id);
        fetchVideos();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const openAddModal = () => {
    setSelectedVideo(null);
    setTitle('');
    setUrl('');
    setDuration(0);
    setTranscripts([]);
    setStep(1);
    setShowModal(true);
  };

  const handleSave = async () => {
    const payload = {
      id: selectedVideo ? selectedVideo.id : undefined,
      title,
      url,
      duration: Number(duration),
      viewCount: selectedVideo ? selectedVideo.viewCount : 0,
      upload_date: selectedVideo ? selectedVideo.upload_date : new Date().toISOString(),
      transcripts: transcripts.map(t => ({
        text: t.text,
        start: Number(t.start),
        dur: Number(t.dur)
      }))
    };

    try {
      if (selectedVideo) {
        await updateVideo(selectedVideo.id, payload);
      } else {
        await createVideo(payload);
      }
      setShowModal(false);
      fetchVideos();
    } catch (e) {
      console.error('Save error', e);
      alert('Failed to save video');
    }
  };

  const addTranscriptRow = () => {
    setTranscripts([...transcripts, { text: '', start: 0, dur: 0 }]);
  };

  const removeTranscriptRow = (idx: number) => {
    setTranscripts(transcripts.filter((_, i) => i !== idx));
  };

  const updateTranscriptRow = (idx: number, field: string, value: any) => {
    const next = [...transcripts];
    next[idx] = { ...next[idx], [field]: value };
    setTranscripts(next);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Video Lessons</h2>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={openAddModal}>
          <Plus size={18} /> Add New Video
        </button>
      </div>

      <div className="card p-4">
        {isLoading ? (
          <div>Loading videos...</div>
        ) : (
          <DataTableWrapper data={videos} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(40, 63, 59, 0.5)' }}></div>
          <div className="modal d-block show" tabIndex={-1}>
            <div className={`modal-dialog modal-dialog-centered ${step === 2 ? 'modal-xl' : ''}`}>
              <div className="modal-content" style={{ border: 'var(--beelish-border)', boxShadow: 'var(--beelish-shadow)' }}>
                <div className="modal-header border-bottom border-dark border-3" style={{ backgroundColor: 'var(--beelish-primary)' }}>
                  <h5 className="modal-title fw-bold" style={{ color: 'var(--beelish-secondary)' }}>
                    {selectedVideo ? 'Edit Video' : 'Add New Video'} - Step {step} of 2
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                
                <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  {step === 1 && (
                    <>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input type="text" className="form-control border-dark border-2" value={title} onChange={e => setTitle(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">YouTube URL (ID)</label>
                        <input type="text" className="form-control border-dark border-2" value={url} onChange={e => setUrl(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Duration (HH:MM:SS)</label>
                        <div className="d-flex gap-2 align-items-center">
                          <input type="number" min="0" placeholder="HH" className="form-control border-dark border-2" style={{ width: '80px' }} value={durHours === 0 ? '' : durHours} onChange={e => handleDurationChange(Number(e.target.value), durMinutes, durSeconds)} />
                          <span className="fw-bold">:</span>
                          <input type="number" min="0" max="59" placeholder="MM" className="form-control border-dark border-2" style={{ width: '80px' }} value={durMinutes === 0 && durHours === 0 ? '' : durMinutes} onChange={e => handleDurationChange(durHours, Number(e.target.value), durSeconds)} />
                          <span className="fw-bold">:</span>
                          <input type="number" min="0" max="59" placeholder="SS" className="form-control border-dark border-2" style={{ width: '80px' }} value={durSeconds === 0 && duration === 0 ? '' : durSeconds} onChange={e => handleDurationChange(durHours, durMinutes, Number(e.target.value))} />
                          <span className="ms-3 text-muted" style={{ fontSize: '0.85rem' }}>(Tổng: {duration} giây)</span>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold m-0">Transcripts</h6>
                        <button className="btn btn-sm btn-outline-primary" onClick={addTranscriptRow}>+ Add Line</button>
                      </div>
                      {transcripts.length === 0 ? (
                        <div className="text-muted text-center py-4">No transcripts added yet.</div>
                      ) : (
                        <table className="table table-bordered align-middle">
                          <thead className="table-light">
                            <tr>
                              <th style={{ width: '50%' }}>Sentence</th>
                              <th style={{ width: '25%' }}>Start (HH:MM:SS)</th>
                              <th style={{ width: '15%' }}>Dur (s)</th>
                              <th style={{ width: '10%' }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transcripts.map((t, idx) => (
                              <tr key={idx}>
                                <td>
                                  <textarea 
                                    className="form-control border-dark" 
                                    rows={1}
                                    value={t.text} 
                                    onChange={e => updateTranscriptRow(idx, 'text', e.target.value)} 
                                  />
                                </td>
                                <td>
                                  <TimeInput value={Number(t.start) || 0} onChange={val => updateTranscriptRow(idx, 'start', val)} />
                                </td>
                                <td>
                                  <input 
                                    type="number" 
                                    step="0.1"
                                    className="form-control border-dark" 
                                    value={t.dur} 
                                    onChange={e => updateTranscriptRow(idx, 'dur', e.target.value)} 
                                  />
                                </td>
                                <td className="text-center">
                                  <button className="btn btn-sm btn-danger" onClick={() => removeTranscriptRow(idx)}>
                                    <Trash2 size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </>
                  )}
                </div>

                <div className="modal-footer border-top border-dark border-3 justify-content-between">
                  {step === 1 ? (
                    <>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                      <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>Next: Transcripts &rarr;</button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>&larr; Back</button>
                      <button type="button" className="btn btn-success fw-bold" onClick={handleSave}>Save Video</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
