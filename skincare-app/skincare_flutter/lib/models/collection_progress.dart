const discoveryProductTypes = <String, String>{
  'cleanser': 'Cleanser',
  'toner': 'Toner',
  'serum': 'Serum',
  'moisturiser': 'Moisturiser',
  'sunscreen': 'Sunscreen',
  'mask': 'Mask',
  'exfoliant': 'Exfoliant',
  'other': 'Other',
};

class CollectionMilestone {
  final int target;
  final String name;
  const CollectionMilestone(this.target, this.name);
}

const collectionMilestones = [
  CollectionMilestone(1, 'First discovery'),
  CollectionMilestone(5, 'Curious collector'),
  CollectionMilestone(10, 'Shelf curator'),
  CollectionMilestone(25, 'Collection keeper'),
];

class CollectionProgress {
  final int count;
  CollectionProgress(int count) : count = count < 0 ? 0 : count;
  List<CollectionMilestone> get earned =>
      collectionMilestones.where((m) => count >= m.target).toList();
  CollectionMilestone? get next {
    for (final milestone in collectionMilestones) {
      if (count < milestone.target) return milestone;
    }
    return null;
  }

  double get fraction =>
      next == null ? 1 : (count / next!.target).clamp(0, 1).toDouble();
}
