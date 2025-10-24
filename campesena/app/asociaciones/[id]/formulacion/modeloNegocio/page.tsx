'use client';

import { useState } from 'react';
import { Download, Plus } from 'lucide-react';

interface CanvasSection {
    id: string;
    title: string;
    content: string[];
    color: string;
}

interface CanvasCardProps {
    section: CanvasSection;
    onEdit: (id: string) => void;
    onRemove: (sectionId: string, index: number) => void;
    isEditing: boolean;
    newItem: string;
    setNewItem: (value: string) => void;
    onAdd: (sectionId: string) => void;
    tall?: boolean;
}

function CanvasCard({ section, onEdit, onRemove, isEditing, newItem, setNewItem, onAdd, tall, updateSectionContent }: CanvasCardProps & { updateSectionContent: (sectionId: string, newContent: string[]) => void }) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    const startEditing = (index: number, currentValue: string) => {
        setEditingIndex(index);
        setEditValue(currentValue);
    };

    const saveEdit = (sectionId: string, index: number) => {
        if (editValue.trim()) {
            const newContent = [...section.content];
            newContent[index] = editValue.trim();
            updateSectionContent(sectionId, newContent);
        }
        setEditingIndex(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent, sectionId: string, index: number) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEdit(sectionId, index);
        } else if (e.key === 'Escape') {
            setEditingIndex(null);
        }
    };

    return (
        <div
            className={`${section.color} border-2 rounded-xl shadow-md p-4 transition-all hover:shadow-lg flex flex-col ${tall ? 'min-h-[415px] max-h-[415px]' : 'min-h-[200px] max-h-[200px]'}`}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-sm">{section.title}</h3>
                    <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {section.content.length}
                    </span>
                </div>
                <button className="p-1.5 hover:bg-white/50 rounded-lg transition-colors" onClick={() => onEdit(section.id)}>
                    <Plus className="text-slate-600" size={16} />
                </button>
            </div>

            <div
                className={`space-y-1 flex-grow overflow-y-auto ${section.content.length > 4 ? 'overflow-y-auto pr-2' : ''}`}
            >
                {section.content.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white/70 rounded-lg p-2 text-xs text-slate-700 flex items-start justify-between group"
                    >
                        {editingIndex === index ? (
                            <div className="flex-1 flex">
                                <input
                                    type="text"
                                    autoFocus
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, section.id, index)}
                                    onBlur={() => saveEdit(section.id, index)}
                                    className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        ) : (
                            <span 
                                className="flex-1 cursor-text"
                                onClick={() => startEditing(index, item)}
                            >
                                {item}
                            </span>
                        )}
                        <button
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2"
                            onClick={() => onRemove(section.id, index)}
                        >
                            ×
                        </button>
                    </div>
                ))}

                {isEditing && (
                    <div className="mt-2">
                        <textarea
                            autoFocus
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Agregar nuevo elemento..."
                            rows={2}
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onAdd(section.id);
                                }
                            }}
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                className="px-3 py-1 bg-slate-800 text-white text-sm rounded hover:bg-slate-700 transition-colors"
                                onClick={() => onAdd(section.id)}
                            >
                                Agregar
                            </button>
                            <button
                                className="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded hover:bg-slate-300 transition-colors"
                                onClick={() => onEdit('')}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface PageProps {
    params: {
        id: string;
    };
}

export default function ModeloNegocioPage({ params }: PageProps) {
    const [canvasData, setCanvasData] = useState<CanvasSection[]>([
        { id: 'socios', title: 'Socios Clave', content: [], color: 'bg-emerald-50 border-emerald-300' },
        { id: 'actividades', title: 'Actividades Clave', content: [], color: 'bg-yellow-50 border-yellow-300' },
        { id: 'recursos', title: 'Recursos Clave', content: [], color: 'bg-amber-50 border-amber-300' },
        { id: 'propuesta', title: 'Propuesta de Valor', content: [], color: 'bg-blue-50 border-blue-300' },
        { id: 'relacion', title: 'Relación con Clientes', content: [], color: 'bg-sky-50 border-sky-300' },
        { id: 'canales', title: 'Canales', content: [], color: 'bg-cyan-50 border-cyan-300' },
        { id: 'segmentos', title: 'Segmentos de Mercado', content: [], color: 'bg-slate-50 border-slate-300' },
        { id: 'costos', title: 'Estructura de Costos', content: [], color: 'bg-rose-50 border-rose-300' },
        { id: 'ingresos', title: 'Fuentes de Ingreso', content: [], color: 'bg-orange-50 border-orange-300' },
    ]);

    const [mision, setMision] = useState('');
    const [vision, setVision] = useState('');
    const [editingSection, setEditingSection] = useState<string | null>(null);
    const [newItem, setNewItem] = useState('');

    const addItem = (sectionId: string) => {
        if (newItem.trim()) {
            setCanvasData((prev) =>
                prev.map((section) =>
                    section.id === sectionId ? { ...section, content: [...section.content, newItem.trim()] } : section,
                ),
            );
            setNewItem('');
            setEditingSection(null);
        }
    };

    const removeItem = (sectionId: string, index: number) => {
        setCanvasData((prev) =>
            prev.map((section) =>
                section.id === sectionId ? { ...section, content: section.content.filter((_, i) => i !== index) } : section,
            ),
        );
    };

    const updateSectionContent = (sectionId: string, newContent: string[]) => {
        setCanvasData((prev) =>
            prev.map((section) =>
                section.id === sectionId ? { ...section, content: newContent } : section,
            ),
        );
    };

    const exportData = () => {
        const data = {
            mision,
            vision,
            canvas: canvasData,
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'business-model-canvas.json';
        a.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Modelo de Negocio</h1>
                    <p className="text-slate-600">Defina su modelo de negocio con la metodología Canvas</p>

                    <div className="flex gap-3 mt-6">
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                            onClick={exportData}
                        >
                            <Download size={18} />
                            Exportar
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Misión</label>
                        <textarea
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Define la misión de tu negocio..."
                            rows={3}
                            value={mision}
                            onChange={(e) => setMision(e.target.value)}
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Visión</label>
                        <textarea
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Define la visión de tu negocio..."
                            rows={3}
                            value={vision}
                            onChange={(e) => setVision(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="space-y-4">
                        <CanvasCard
                            tall
                            isEditing={editingSection === canvasData[0].id}
                            newItem={newItem}
                            section={canvasData[0]}
                            setNewItem={setNewItem}
                            onAdd={addItem}
                            onEdit={setEditingSection}
                            onRemove={removeItem}
                            updateSectionContent={updateSectionContent}
                        />
                    </div>

                    <div className="space-y-4">
                        <CanvasCard
                            isEditing={editingSection === canvasData[1].id}
                            newItem={newItem}
                            section={canvasData[1]}
                            setNewItem={setNewItem}
                            onAdd={addItem}
                            onEdit={setEditingSection}
                            onRemove={removeItem}
                            updateSectionContent={updateSectionContent}
                        />
                        <CanvasCard
                            isEditing={editingSection === canvasData[2].id}
                            newItem={newItem}
                            section={canvasData[2]}
                            setNewItem={setNewItem}
                            onAdd={addItem}
                            onEdit={setEditingSection}
                            onRemove={removeItem}
                            updateSectionContent={updateSectionContent}
                        />
                    </div>

                    <div className="md:row-span-2">
                        <CanvasCard
                            tall
                            isEditing={editingSection === canvasData[3].id}
                            newItem={newItem}
                            section={canvasData[3]}
                            setNewItem={setNewItem}
                            onAdd={addItem}
                            onEdit={setEditingSection}
                            onRemove={removeItem}
                            updateSectionContent={updateSectionContent}
                        />
                    </div>

                    <div className="space-y-4">
                        <CanvasCard
                            isEditing={editingSection === canvasData[4].id}
                            newItem={newItem}
                            section={canvasData[4]}
                            setNewItem={setNewItem}
                            onAdd={addItem}
                            onEdit={setEditingSection}
                            onRemove={removeItem}
                            updateSectionContent={updateSectionContent}
                        />
                        <CanvasCard
                            isEditing={editingSection === canvasData[5].id}
                            newItem={newItem}
                            section={canvasData[5]}
                            setNewItem={setNewItem}
                            onAdd={addItem}
                            onEdit={setEditingSection}
                            onRemove={removeItem}
                            updateSectionContent={updateSectionContent}
                        />
                    </div>

                    <div className="space-y-4">
                        <CanvasCard
                            tall
                            isEditing={editingSection === canvasData[6].id}
                            newItem={newItem}
                            section={canvasData[6]}
                            setNewItem={setNewItem}
                            onAdd={addItem}
                            onEdit={setEditingSection}
                            onRemove={removeItem}
                            updateSectionContent={updateSectionContent}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <CanvasCard
                        isEditing={editingSection === canvasData[7].id}
                        newItem={newItem}
                        section={canvasData[7]}
                        setNewItem={setNewItem}
                        onAdd={addItem}
                        onEdit={setEditingSection}
                        onRemove={removeItem}
                        updateSectionContent={updateSectionContent}
                    />
                    <CanvasCard
                        isEditing={editingSection === canvasData[8].id}
                        newItem={newItem}
                        section={canvasData[8]}
                        setNewItem={setNewItem}
                        onAdd={addItem}
                        onEdit={setEditingSection}
                        onRemove={removeItem}
                        updateSectionContent={updateSectionContent}
                    />
                </div>
            </div>
        </div>
    );
}
