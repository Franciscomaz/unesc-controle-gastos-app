import React, { useState, useEffect } from 'react';

import { Row, Col, Input, Button } from 'antd';

import CategoryDetail from './CategoryDetail';
import CategoryService from './category.service';
import CategoryTable from './CategoryTable';

import notificator from '../../core/feedback/notificator';

function CategoryPage() {
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async filter => {
    setIsLoading(true);

    try {
      const response = await CategoryService.findAll({ nome: filter });
      setCategories(response.data);
    } catch {
      setCategories([]);
    }

    setIsLoading(false);
  };

  const handleSave = payload => {
    const apiServiceCall = () => {
      return !!payload.id
        ? CategoryService.update(payload.id, payload)
        : CategoryService.save(payload);
    };

    return apiServiceCall().then(() => {
      notificator.success(
        `Categoria ${payload.id ? 'editada' : 'cadastrada'} com sucesso`
      );
      loadCategories();
    });
  };

  const handleEdit = data => {
    setCategory(data);
    setIsCategoryModalOpen(true);
  };

  const handleDelete = id => {
    CategoryService.delete(id).then(() => loadCategories());
  };

  const handleClose = () => {
    setCategory({});
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="p-2">
      <CategoryDetail
        category={category}
        isVisible={isCategoryModalOpen}
        handleSave={handleSave}
        handleClose={handleClose}
      />

      <Row className="mb-2" type="flex" justify="space-between">
        <Col>
          <Button
            type="primary"
            icon="plus"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            Categoria
          </Button>
        </Col>
        <Col>
          <Row type="flex">
            <Col style={{ paddingRight: 5 }}>
              <Button
                shape="circle"
                icon="reload"
                onClick={() => loadCategories()}
                disabled={isLoading}
              />
            </Col>
            <Col>
              <Input.Search
                placeholder="search"
                onSearch={value => loadCategories(value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="has-white" style={{ minHeight: 280, padding: 25 }}>
        <CategoryTable
          categories={categories}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={isLoading}
        ></CategoryTable>
      </div>
    </div>
  );
}

export default CategoryPage;
