import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadAllWorks, loadAllAdvertisements } from '../lib/contentLoader';

interface Work {
  id?: string;
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  images: string[];
  date: string;
  featured: boolean;
}

interface Advertisement {
  id?: string;
  titleAr: string;
  titleFr: string;
  images: string[];
  date: string;
  active: boolean;
}

export const Admin = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'works' | 'advertisements'>('works');
  const [works, setWorks] = useState<Work[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = () => {
    try {
      const loadedWorks = loadAllWorks();
      const loadedAds = loadAllAdvertisements();
      setWorks(loadedWorks);
      setAdvertisements(loadedAds);
    } catch (err) {
      console.error('Error loading content:', err);
    }
  };

  const handleSaveWork = (work: Work) => {
    const updatedWorks = work.id
      ? works.map(w => w.id === work.id ? work : w)
      : [...works, { ...work, id: `work-${Date.now()}` }];

    setWorks(updatedWorks);
    downloadJSON(updatedWorks, 'works-backup.json');
    setShowForm(false);
    setEditingItem(null);
    alert('Work saved! Download the backup file and update your repository.');
  };

  const handleSaveAdvertisement = (ad: Advertisement) => {
    const updatedAds = ad.id
      ? advertisements.map(a => a.id === ad.id ? ad : a)
      : [...advertisements, { ...ad, id: `ad-${Date.now()}` }];

    setAdvertisements(updatedAds);
    downloadJSON(updatedAds, 'advertisements-backup.json');
    setShowForm(false);
    setEditingItem(null);
    alert('Advertisement saved! Download the backup file and update your repository.');
  };

  const handleDelete = (type: 'work' | 'advertisement', id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    if (type === 'work') {
      const updatedWorks = works.filter(w => w.id !== id);
      setWorks(updatedWorks);
      downloadJSON(updatedWorks, 'works-backup.json');
    } else {
      const updatedAds = advertisements.filter(a => a.id !== id);
      setAdvertisements(updatedAds);
      downloadJSON(updatedAds, 'advertisements-backup.json');
    }
  };

  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This admin panel allows you to edit content locally.
              Changes are saved to browser storage and exported as JSON files.
              For production use, please use Netlify CMS at <code>/admin</code>.
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('works')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'works'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Works ({works.length})
            </button>
            <button
              onClick={() => setActiveTab('advertisements')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'advertisements'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Advertisements ({advertisements.length})
            </button>
          </div>

          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors mb-6"
          >
            <Plus className="w-5 h-5" />
            Add New {activeTab === 'works' ? 'Work' : 'Advertisement'}
          </button>

          {activeTab === 'works' && (
            <WorksList
              works={works}
              onEdit={(work) => {
                setEditingItem(work);
                setShowForm(true);
              }}
              onDelete={(id) => handleDelete('work', id)}
            />
          )}

          {activeTab === 'advertisements' && (
            <AdvertisementsList
              advertisements={advertisements}
              onEdit={(ad) => {
                setEditingItem(ad);
                setShowForm(true);
              }}
              onDelete={(id) => handleDelete('advertisement', id)}
            />
          )}
        </div>
      </div>

      {showForm && activeTab === 'works' && (
        <WorkForm
          work={editingItem}
          onSave={handleSaveWork}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}

      {showForm && activeTab === 'advertisements' && (
        <AdvertisementForm
          advertisement={editingItem}
          onSave={handleSaveAdvertisement}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};

const WorksList = ({ works, onEdit, onDelete }: any) => (
  <div className="space-y-4">
    {works.map((work: Work) => (
      <div key={work.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-lg">{work.titleAr}</h3>
            <p className="text-gray-600 text-sm">{work.titleFr}</p>
            <p className="text-gray-500 text-sm mt-2">{work.descriptionAr.substring(0, 100)}...</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span className={work.featured ? 'text-green-600 font-medium' : 'text-gray-500'}>
                {work.featured ? '★ Featured' : 'Not Featured'}
              </span>
              <span className="text-gray-500">{new Date(work.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(work)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(work.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const AdvertisementsList = ({ advertisements, onEdit, onDelete }: any) => (
  <div className="space-y-4">
    {advertisements.map((ad: Advertisement) => (
      <div key={ad.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-lg">{ad.titleAr}</h3>
            <p className="text-gray-600 text-sm">{ad.titleFr}</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span className={ad.active ? 'text-green-600 font-medium' : 'text-gray-500'}>
                {ad.active ? '● Active' : '○ Inactive'}
              </span>
              <span className="text-gray-500">{new Date(ad.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(ad)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(ad.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const WorkForm = ({ work, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState<Work>(
    work || {
      titleAr: '',
      titleFr: '',
      descriptionAr: '',
      descriptionFr: '',
      images: [''],
      date: new Date().toISOString().split('T')[0],
      featured: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titleAr || !formData.titleFr) {
      alert('Please fill in required fields');
      return;
    }

    onSave({ ...formData, images: formData.images.filter(img => img.trim()) });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6">{work ? 'Edit Work' : 'Add New Work'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title (Arabic) *</label>
            <input
              type="text"
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title (French) *</label>
            <input
              type="text"
              value={formData.titleFr}
              onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description (Arabic)</label>
            <textarea
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description (French)</label>
            <textarea
              value={formData.descriptionFr}
              onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URLs (one per line)</label>
            <textarea
              value={formData.images.join('\n')}
              onChange={(e) => setFormData({ ...formData, images: e.target.value.split('\n') })}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Featured</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
            >
              <Save className="w-5 h-5" />
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdvertisementForm = ({ advertisement, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState<Advertisement>(
    advertisement || {
      titleAr: '',
      titleFr: '',
      images: [''],
      date: new Date().toISOString().split('T')[0],
      active: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titleAr || !formData.titleFr) {
      alert('Please fill in required fields');
      return;
    }

    onSave({ ...formData, images: formData.images.filter(img => img.trim()) });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6">{advertisement ? 'Edit Advertisement' : 'Add New Advertisement'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title (Arabic) *</label>
            <input
              type="text"
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title (French) *</label>
            <input
              type="text"
              value={formData.titleFr}
              onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URLs (one per line)</label>
            <textarea
              value={formData.images.join('\n')}
              onChange={(e) => setFormData({ ...formData, images: e.target.value.split('\n') })}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Active</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
            >
              <Save className="w-5 h-5" />
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
