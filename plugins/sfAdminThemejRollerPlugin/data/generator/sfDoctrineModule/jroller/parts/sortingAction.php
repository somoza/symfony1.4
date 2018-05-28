  protected function addSortQuery($query)
  {
    $query->addOrderBy('created_at DESC');
  }

  protected function getSort()
  {
    if (!is_null($sort = $this->getUser()->getAttribute('<?php echo $this->getModuleName() ?>.sort', null, 'admin_module')))
    {
      return $sort;
    }

    $this->setSort($this->configuration->getDefaultSort());

    return $this->getUser()->getAttribute('<?php echo $this->getModuleName() ?>.sort', null, 'admin_module');
  }

  protected function setSort(array $sort)
  {
    if (!is_null($sort[0]) && is_null($sort[1]))
    {
      $sort[1] = 'asc';
    }

    $this->getUser()->setAttribute('<?php echo $this->getModuleName() ?>.sort', $sort, 'admin_module');
  }
